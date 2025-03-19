using Microsoft.EntityFrameworkCore;
using UIXcelerate.Server.Models;

namespace UIXcelerate.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<UiElement> UiElements { get; set; }
    }
}
