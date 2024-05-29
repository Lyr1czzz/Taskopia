using System.Security.Claims;
using Taskopia.Models;

namespace Taskopia.TokenProviders
{
    public interface ITokenProvider
    {
        public string GenerateJwtToken(User user, List<string> roles);
        public RefreshToken GenerateRefreshToken();
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}