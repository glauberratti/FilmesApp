using FilmesApp.Core.Interfaces.Repository.Repositories;
using System;
using System.Threading.Tasks;

namespace FilmesApp.Core.Interfaces.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IMovieRepository Movie { get; }

        Task<int> CommitAsync();
    }
}
