// Contracts/UpdateUserDto.cs
namespace Taskopia.Contracts
{
    public record UpdateUserDto(
        string UserName,
        string Email,
        string PhoneNumber);
}