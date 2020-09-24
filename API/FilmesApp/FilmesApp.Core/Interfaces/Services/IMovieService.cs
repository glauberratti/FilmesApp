using FilmesApp.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FilmesApp.Core.Interfaces.Services
{
    public interface IMovieService
    {
        ValueTask<Movie> GetById(int id);
        Task<IEnumerable<Movie>> GetAll();
        Task Save(Movie movie);
        Task Delete(int id);
    }
}
