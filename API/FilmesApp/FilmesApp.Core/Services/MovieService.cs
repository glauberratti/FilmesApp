using FilmesApp.Core.Entities;
using FilmesApp.Core.Interfaces.Repository;
using FilmesApp.Core.Interfaces.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FilmesApp.Core.Services
{
    public class MovieService : IMovieService
    {
        private readonly IUnitOfWork _unitOfWork;

        public MovieService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async ValueTask<Movie> GetById(int id)
        {
            return await _unitOfWork.Movie.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Movie>> GetAll()
        {
            return await _unitOfWork.Movie.GetAllAsync();
        }

        public async Task Add(Movie movie)
        {
            await _unitOfWork.Movie.AddAsync(movie);
            await _unitOfWork.CommitAsync();
        }

        public async Task Update(Movie movie)
        {
            await _unitOfWork.Movie.UpdateAsync(movie);
            await _unitOfWork.CommitAsync();
        }

        public async Task Delete(int id)
        {
            await _unitOfWork.Movie.DeleteAsync(id);
            await _unitOfWork.CommitAsync();
        }
    }
}
