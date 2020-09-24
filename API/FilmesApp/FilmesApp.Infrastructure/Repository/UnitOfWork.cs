using FilmesApp.Core.Interfaces.Repository;
using FilmesApp.Core.Interfaces.Repository.Repositories;
using FilmesApp.Infrastructure.Data;
using FilmesApp.Infrastructure.Repository.Repositories;
using System.Threading.Tasks;

namespace FilmesApp.Infrastructure.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly FilmesAppContext _filmesAppContext;
        private IMovieRepository _movieRepository;

        public UnitOfWork(FilmesAppContext filmesAppContext)
        {
            _filmesAppContext = filmesAppContext;
        }

        public IMovieRepository Movie => _movieRepository ??= new MovieRepository(_filmesAppContext);

        public async Task<int> CommitAsync()
        {
            return await _filmesAppContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _filmesAppContext.Dispose();
        }
    }
}
