using FilmesApp.Core.Interfaces.Repository;
using FilmesApp.Core.Interfaces.Services;
using FilmesApp.Core.Services;
using FilmesApp.Infrastructure.Data;
using FilmesApp.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FilmesApp.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDIInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IMovieService, MovieService>();
            services.AddDbContext<FilmesAppContext>(opt => opt.UseSqlite(configuration.GetConnectionString("SQLite")));

            return services;
        }
    }
}
