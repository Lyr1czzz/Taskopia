namespace Taskopia.Models
{
    public class Note
    {

        public Note(string title, string description, List<string> tags)
        {
            Title = title;
            Description = description;
            CreatedAt = DateTime.UtcNow;
            Tags = tags;
        }

        public Guid Id { get; init; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreatedAt { get; init; }
        public List<string> Tags { get; set; }
    }
}
