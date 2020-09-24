using FilmesApp.Core.Entities;
using FilmesApp.Core.Interfaces.Repository;
using FilmesApp.Core.Interfaces.Repository.Repositories;
using FilmesApp.Infrastructure.Data;

namespace FilmesApp.Infrastructure.Repository.Repositories
{
    public class MovieRepository : Repository<Movie> , IMovieRepository
    {
        public MovieRepository(FilmesAppContext filmesAppContext) : base(filmesAppContext) { }
    }
}
