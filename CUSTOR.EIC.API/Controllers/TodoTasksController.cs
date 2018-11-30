using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/TodoTasks")]
    public class TodoTasksController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TodoTasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TodoTasks
        [HttpGet]
        public IEnumerable<TodoTask> GetTodoTask()
        {
            return _context.TodoTask;
        }

        // GET: api/TodoTasks/5
        [HttpGet("{id}")]
        public IEnumerable<TodoTask> GetTodoTask([FromRoute] string id)
        {
            var now = DateTime.Now;
            var todoTask = _context.TodoTask.Where(m => m.AssignedUserId == id && m.AssignedDate.Month >= now.Month)
                .Include(s => s.ServiceApplication).AsEnumerable();

            return todoTask;
        }

        [HttpGet("CompletedTask/{id}")]
        public int CountCompletedTask([FromRoute] string id)
        {
            var now = DateTime.Now;
            var todoTask = _context.TodoTask
                .Where(m => m.AssignedUserId == id && m.AssignedDate.Month >= now.Month && m.IsActive == true).Count();

            return todoTask;
        }

        [HttpGet("PendingTask/{id}")]
        public int CountPendingTask([FromRoute] string id)
        {
            var now = DateTime.Now;
            var todoTask = _context.TodoTask.Where(m =>
                m.AssignedUserId == id && m.AssignedDate.Month >= now.Month && m.IsActive == false).Count();

            return todoTask;
        }

        // PUT: api/TodoTasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoTask([FromRoute] int id, [FromBody] TodoTask todoTask)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != todoTask.TodoTaskId) return BadRequest();

            _context.Entry(todoTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoTaskExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/TodoTasks
        [HttpPost]
        public async Task<IActionResult> PostTodoTask([FromBody] TodoTask todoTask)
        {
            var editeTodoTask = todoTask;
            editeTodoTask.IsActive = false;
            editeTodoTask.AssignedDate = DateTime.Now;


            _context.TodoTask.Add(editeTodoTask);
            await _context.SaveChangesAsync();
            if (editeTodoTask.TodoTaskId > 0)
            {
                var serviceApplication =
                    _context.ServiceApplication.First(s => s.ServiceApplicationId == todoTask.ServiceApplicationId);
                serviceApplication.TodoTaskId = editeTodoTask.TodoTaskId;
                _context.Entry(serviceApplication).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction("GetTodoTask", new {id = editeTodoTask.TodoTaskId}, editeTodoTask);
        }

        // DELETE: api/TodoTasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoTask([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var todoTask = await _context.TodoTask.SingleOrDefaultAsync(m => m.TodoTaskId == id);
            if (todoTask == null) return NotFound();

            _context.TodoTask.Remove(todoTask);
            await _context.SaveChangesAsync();

            return Ok(todoTask);
        }

        private bool TodoTaskExists(int id)
        {
            return _context.TodoTask.Any(e => e.TodoTaskId == id);
        }
    }
}