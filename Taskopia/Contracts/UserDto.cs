namespace Taskopia.Contracts
{
    public record UserDto(
        string UserName,
        string Email,
        string Password,
        string PhoneNumber);
}
