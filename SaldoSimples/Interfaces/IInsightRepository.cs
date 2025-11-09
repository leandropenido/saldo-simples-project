using SaldoSimples.Models;

namespace SaldoSimples.Interfaces
{
    public interface IInsightRepository
    {
        Task<bool> DoesItemExist(int id);
        Task<IEnumerable<Insight>> All();
        Task<Insight?> Find(int id);
        Task Insert(Insight despesa);
        Task Update(Insight despesa);
        Task Delete(int id);
    }
}