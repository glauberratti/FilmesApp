using FilmesApp.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FilmesApp.Infrastructure.Data.Configurations
{
    public class MovieConfiguration : IEntityTypeConfiguration<Movie>
    {
        public void Configure(EntityTypeBuilder<Movie> builder)
        {
            builder
                .HasKey(c => c.Id);

            builder
                .Property(c => c.Id)
                .ValueGeneratedOnAdd();

            builder
                .Property(c => c.Title)
                .IsRequired()
                .HasMaxLength(100);

            builder
                .Property(c => c.Director)
                .IsRequired()
                .HasMaxLength(100);

            builder
                .Property(c => c.Genre)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .Property(c => c.Synopsis)
                .HasMaxLength(500);

            builder
                .Property(c => c.Year)
                .HasMaxLength(4);
        }
    }
}
