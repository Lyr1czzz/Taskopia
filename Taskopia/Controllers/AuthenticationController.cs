using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Taskopia.Contracts;
using Taskopia.DataAccess;
using Taskopia.Models;
using Taskopia.TokenProviders;

namespace Taskopia.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ITokenProvider _tokenProvider;

        public AuthenticationController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager,ITokenProvider tokenProvider)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenProvider = tokenProvider;
        }

        [HttpPost]
        [Route("Registration")]
        [AllowAnonymous]
        public async Task<IActionResult> Registration([FromBody] UserDto userDto, CancellationToken ct)
        {
            var user = new User() 
            {
                UserName = userDto.UserName,
                Email = userDto.Email,
                PasswordHash = userDto.Password
            };

            var result = await _userManager.CreateAsync(user, user.PasswordHash);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Failed creation. Exception from repository");
            }
            if(await _roleManager.RoleExistsAsync("Customer"))
            {
                await _userManager.AddToRoleAsync(user, "Customer");
            }
            return Ok();
        }



        [HttpPost]
        [Route("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user is null)
            {
                //throw new NotFoundException($"User {request.UserName} not found");
            }
            if (!await _userManager.CheckPasswordAsync(user!, request.Password))
            {
                //throw new InvalidPasswordException("Incorrect password");
            }
            //if (!await _userManager.IsEmailConfirmedAsync(user!))
            //{
            //    //throw new ConfirmEmailException("Email not confirmed");
            //}
            var userRoles = await _userManager.GetRolesAsync(user!);
            if (userRoles is null)
            {
                throw new InvalidOperationException("Roles not found");
            }
            var jwtToken = _tokenProvider.GenerateJwtToken(user!, userRoles.ToList());
            var refreshToken = _tokenProvider.GenerateRefreshToken();
            await UpdateRefreshTokenAsync(user!, refreshToken);
            var response =  new AuthenticateResponseDto(jwtToken, refreshToken.Token!);




            if (response is not null)
            {
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.UtcNow.AddHours(1),
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Path = "/",
                    Secure = true,
                };
                Response.Cookies.Append("JWT", response.JwtToken,
                cookieOptions);
                Response.Cookies.Append("Refresh", response.RefreshToken,
                cookieOptions);
                return Ok("Login successfully");
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("RefreshTokens")]
        public async Task<IActionResult> RefreshTokens()
        {
            var jwtToken = Request.Cookies["JWT"];
            var refreshToken = Request.Cookies["Refresh"];
            if (string.IsNullOrEmpty(jwtToken) ||
            string.IsNullOrEmpty(refreshToken))
            {
                throw new InvalidOperationException("Invalid access token or refresh token");
            }

            var principal = _tokenProvider.GetPrincipalFromExpiredToken(jwtToken);
            if (principal is null)
            {
                throw new InvalidOperationException("Principal not found");
            }
            var userId = principal.Claims.FirstOrDefault(claim => claim.Type ==
            ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
            var userForUpdate = await _userManager.FindByIdAsync(userId);
            if (userForUpdate is null || userForUpdate.RefreshToken != refreshToken || userForUpdate.TokenExpires < DateTime.UtcNow)
            {
                throw new Exception("Refresh token expiried or user not found");
            }
            var userRoles = await _userManager.GetRolesAsync(userForUpdate);
            var newJwtToken = _tokenProvider.GenerateJwtToken(userForUpdate, userRoles.ToList());
            var newRefreshToken = _tokenProvider.GenerateRefreshToken();
            await UpdateRefreshTokenAsync(userForUpdate,
            newRefreshToken);
          

            var response = new AuthenticateResponseDto(newJwtToken, newRefreshToken.Token!);
            if (response is not null)
            {
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddHours(1),
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Path = "/",
                    Secure = true,
                };
                Response.Cookies.Append("JWT", response.JwtToken, cookieOptions);
                Response.Cookies.Append("Refresh", response.RefreshToken,
                cookieOptions);
                //User.FindFirstValue(ClaimTypes.NameIdentifier)!
                return Ok("Refresh successfully");
            }
            return Unauthorized();
        }


        private async Task UpdateRefreshTokenAsync(User user, RefreshToken refreshToken)
        {
            try
            {
                await _userManager.Users
                    .Where(u => u.Id.Equals(user.Id))
                    .ExecuteUpdateAsync(s => s
                    .SetProperty(p => p.RefreshToken, refreshToken.Token)
                    .SetProperty(p => p.TokenCreated, refreshToken.TokenCreated)
                    .SetProperty(p => p.TokenExpires, refreshToken.TokenExpires));
            }
            catch (Exception)
            {
                throw new InvalidOperationException("Failed to update refresh token");
            }
        }
    }
}