using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Taskopia.Contracts;
using Taskopia.DataAccess;
using Taskopia.Models;

namespace Taskopia.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly NotesDbContext _dbContext;
        private readonly ILogger<NotesController> _logger; // Логгер

        public NotesController(NotesDbContext dbContext, ILogger<NotesController> logger)
        {
            _dbContext = dbContext;
            _logger = logger; // Инициализация логгера
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateNoteRequest request, CancellationToken ct)
        {
            try
            {
                var note = new Note (request.Title,request.Description, request.Tags );
                await _dbContext.Notes.AddAsync(note, ct);
                await _dbContext.SaveChangesAsync(ct);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating note: {ex.Message}", ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateNoteRequest request, CancellationToken ct)
        {
            try
            {
                var note = await _dbContext.Notes.FindAsync(new object[] { id }, ct);
                if (note == null)
                {
                    return NotFound();
                }

                note.Title = request.Title;
                note.Description = request.Description;
                note.Tags = request.Tags ?? new List<string>();

                _dbContext.Notes.Update(note);
                await _dbContext.SaveChangesAsync(ct);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating note: {ex.Message}", ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(Guid id, CancellationToken ct)
        {
            try
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
            catch (Exception ex)
            {
                _logger.LogError($"Error removing note: {ex.Message}", ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetNotesRequest request, CancellationToken ct)
        {
            try
            {
                var noteQuery = _dbContext.Notes
                    .Where(n => string.IsNullOrWhiteSpace(request.Search) ||
                                n.Title.ToLower().Contains(request.Search.ToLower()) ||
                                n.Tags.Any(t => t.ToLower().Contains(request.Search.ToLower())));

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
                    .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt, n.Tags))
                    .ToListAsync(cancellationToken: ct);

                return Ok(new GetNotesResponse(noteDtos));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving notes: {ex.Message}", ex);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}