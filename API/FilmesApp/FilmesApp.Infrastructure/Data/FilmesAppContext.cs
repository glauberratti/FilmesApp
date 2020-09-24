using FilmesApp.Core.Entities;
using FilmesApp.Infrastructure.Data.Configurations;
using Microsoft.EntityFrameworkCore;

namespace FilmesApp.Infrastructure.Data
{
    public class FilmesAppContext : DbContext
    {
        public DbSet<Movie> Movies { get; set; }

        public FilmesAppContext(DbContextOptions<FilmesAppContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new MovieConfiguration());
        }
    }
}
