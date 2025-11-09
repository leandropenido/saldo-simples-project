using SaldoSimples.Interfaces;
using SaldoSimples.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace SaldoSimples.Services
{
    public class OrcamentoRepository : IOrcamentoRepository
    {
        private readonly SaldoSimplesContext _orcamento;

        public OrcamentoRepository(SaldoSimplesContext orcamento)
        {
            _orcamento = orcamento;
        }

        public async Task<IEnumerable<Orcamento>> All()
        {
            return await _orcamento.Orcamentos.ToListAsync();
        }

        public async Task<bool> DoesItemExist(int id)
        {
            return await _orcamento.Orcamentos.AnyAsync(item => item.Id == id);
        }

        public async Task<Orcamento?> Find(int id)
        {
            return await _orcamento.Orcamentos.FirstOrDefaultAsync(item => item.Id == id);
        }

        public async Task Insert(Orcamento orcamento)
        {
            _orcamento.Add(orcamento);
            await _orcamento.SaveChangesAsync();
        }

        public async Task Update(Orcamento orcamento)
        {
            _orcamento.Orcamentos.Update(orcamento);
            await _orcamento.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _orcamento.Remove(this.Find(id));
            await _orcamento.SaveChangesAsync();
        }
    }
}