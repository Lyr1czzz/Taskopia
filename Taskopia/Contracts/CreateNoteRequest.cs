namespace Taskopia.Contracts
{
    public record CreateNoteRequest(string Title, string Description, List<string> Tags);
}
