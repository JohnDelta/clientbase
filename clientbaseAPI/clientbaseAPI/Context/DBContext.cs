using clientbaseAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace clientbaseAPI.Context
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<ContactPhone> ContactPhones => Set<ContactPhone>();

        protected override void OnModelCreating(ModelBuilder modelBuilder) { }
    }
}
