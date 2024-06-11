namespace Taskopia.Contracts
{
    public record UpdateNoteRequest(string Title, string Description, List<string> Tags);
}
