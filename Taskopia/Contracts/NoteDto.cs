namespace Taskopia.Contracts
{
    public record NoteDto(Guid Id, string Title, string Description, DateTime CreatedAt);
}
