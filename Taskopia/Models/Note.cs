﻿namespace Taskopia.Models
{
    public class Note
    {

        public Note(string title, string description)
        {
            Title = title;
            Description = description;
            CreatedAt = DateTime.UtcNow;
        }

        public Guid Id { get; init; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreatedAt { get; init; }
    }
}
