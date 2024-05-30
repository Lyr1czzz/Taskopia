using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Threading;
using Taskopia.Contracts;
using Taskopia.DataAccess;
using Taskopia.Models;

namespace Taskopia.Controllers
{
    [ApiController]
    //[Authorize]
    [Route("[controller]")]
    public class NotesController : Controller
    {
        private readonly NotesDbContext _dbContext;

        public NotesController(NotesDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreateNoteRequest request, CancellationToken ct)
        {
            var notes = new Note(request.Title, request.Description);

            await _dbContext.Notes.AddAsync(notes, ct);
            await _dbContext.SaveChangesAsync(ct);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(Guid id, CancellationToken ct)
        {
            var note = await _dbContext.Notes.FindAsync(new object[] { id }, ct);
            if (note == null)
            {
                return NotFound();
            }

            _dbContext.Notes.Remove(note);
            await _dbContext.SaveChangesAsync(ct);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetNotesRequest request, CancellationToken ct)
        {
            var noteQuery = _dbContext.Notes
                .Where(n => string.IsNullOrWhiteSpace(request.Search) ||
                n.Title.ToLower().Contains(request.Search.ToLower()));

            Expression<Func<Note, object>> selectorKey = request.SortItem?.ToLower() switch
            {
                "date" => note => note.CreatedAt,
                "title" => note => note.Title,
                _ => note => note.Id
            };

            if (request.SortOrder == "desc")
            {
                noteQuery = noteQuery.OrderByDescending(selectorKey);
            }
            else
            {
                noteQuery = noteQuery.OrderBy(selectorKey);
            }

            var noteDtos = await noteQuery
                .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt))
                .ToListAsync(cancellationToken: ct);

            return Ok(new GetNotesResponse(noteDtos));
        }
    }
}
