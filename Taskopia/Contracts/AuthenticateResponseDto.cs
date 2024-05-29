namespace Taskopia.Contracts
{
    public record AuthenticateResponseDto(string JwtToken, string RefreshToken);
}