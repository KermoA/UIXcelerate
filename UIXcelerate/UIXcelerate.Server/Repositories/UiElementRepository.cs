using Microsoft.EntityFrameworkCore;
using UIXcelerate.Server.Data;
using UIXcelerate.Server.Models;

namespace UIXcelerate.Server.Repositories
{
    public class UiElementRepository
    {
        private readonly AppDbContext _context;

        public UiElementRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UiElement>> GetAllAsync()
        {
            return await _context.UiElements.ToListAsync();
        }

        public async Task<UiElement> GetByIdAsync(int id)
        {
            return await _context.UiElements.FindAsync(id);
        }

        public async Task AddAsync(UiElement element)
        {
            _context.UiElements.Add(element);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(UiElement element)
        {
            _context.UiElements.Update(element);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var element = await _context.UiElements.FindAsync(id);
            if (element != null)
            {
                _context.UiElements.Remove(element);
                await _context.SaveChangesAsync();
            }
        }
    }
}
