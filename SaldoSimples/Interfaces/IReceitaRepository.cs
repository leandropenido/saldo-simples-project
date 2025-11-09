using SaldoSimples.Models;

namespace SaldoSimples.Interfaces
{
    public interface IReceitaRepository
    {
        Task<bool> DoesItemExist(int id);
        Task<IEnumerable<Receita>> All();
        Task<Receita?> Find(int id);
        Task Insert(Receita receita);
        Task Update(Receita receita);
        Task Delete(int id);
    }
}