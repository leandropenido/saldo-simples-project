using SaldoSimples.Models;

namespace SaldoSimples.Interfaces
{
    public interface IDespesaRepository
    {
        Task<bool> DoesItemExist(int id);
        Task<IEnumerable<Despesa>> All();
        Task<Despesa?> Find(int id);
        Task<List<Despesa>> GetDespesaByUser(int userId);
        Task Insert(Despesa despesa);
        Task Update(Despesa despesa);
        Task Delete(int id);
    }
}