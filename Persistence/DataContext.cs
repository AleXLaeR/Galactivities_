using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
        Database.EnsureCreated();
    }
    
    public DbSet<Activity> Activities { get; set; }
}