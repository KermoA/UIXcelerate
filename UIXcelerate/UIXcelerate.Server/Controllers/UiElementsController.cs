using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UIXcelerate.Server.Models;
using UIXcelerate.Server.Repositories;

namespace UIXcelerate.Server.Controllers
{
    [Route("api/elements")]
    [ApiController]
    public class UiElementsController : ControllerBase
    {
        private readonly UiElementRepository _repository;

        public UiElementsController(UiElementRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<List<UiElement>>> GetAll()
        {
            return await _repository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UiElement>> GetById(int id)
        {
            var element = await _repository.GetByIdAsync(id);
            if (element == null) return NotFound();
            return element;
        }

        [HttpPost]
        public async Task<IActionResult> Create(UiElement element)
        {
            await _repository.AddAsync(element);
            return CreatedAtAction(nameof(GetById), new { id = element.Id }, element);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UiElement element)
        {
            if (id != element.Id) return BadRequest();
            await _repository.UpdateAsync(element);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
