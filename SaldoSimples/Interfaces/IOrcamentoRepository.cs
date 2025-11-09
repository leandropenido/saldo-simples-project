using SaldoSimples.Models;

namespace SaldoSimples.Interfaces
{
    public interface IOrcamentoRepository
    {
        Task<bool> DoesItemExist(int id);
        Task<IEnumerable<Orcamento>> All();
        Task<Orcamento?> Find(int id);
        Task Insert(Orcamento orcamento);
        Task Update(Orcamento orcamento);
        Task Delete(int id);
    }
}