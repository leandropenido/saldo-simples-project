using SaldoSimples.Models;

namespace SaldoSimples.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> DoesItemExist(int id);
        Task<IEnumerable<User>> All();
        Task<User?> Find(int id);
        Task<User?> FindByEmail(string email);
        Task Insert(User user);
        Task Update(User user);
        Task Delete(int id);
    }
}