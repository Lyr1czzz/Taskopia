// Contracts/FetchUserDto.cs
namespace Taskopia.Contracts
{
    public record FetchUserDto(
        Guid Id,
        string UserName,
        string Email,
        string PhoneNumber);
}