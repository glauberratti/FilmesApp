using System.Collections.Generic;
using System.Threading.Tasks;

namespace FilmesApp.Core.Interfaces.Repository
{
    public interface IRepository<TEntity> where TEntity : class
    {
        ValueTask<TEntity> GetByIdAsync(int id);
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task SaveAsync(TEntity entity);
        Task DeleteAsync(int id);
    }
}
