using SaldoSimples.Interfaces;
using SaldoSimples.Models;
using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;

namespace SaldoSimples.Services
{
    public class ReceitaRepository : IReceitaRepository
    {
        private readonly SaldoSimplesContext _receita;

        public ReceitaRepository(SaldoSimplesContext receita)
        {
            _receita = receita;
        }

        public async Task<IEnumerable<Receita>> All()
        {
            return await _receita.Receitas.ToListAsync();
        }

        public async Task<bool> DoesItemExist(int id)
        {
            return await _receita.Receitas.AnyAsync(item => item.Id == id);
        }

        public async Task<Receita?> Find(int id)
        {
            return await _receita.Receitas.FirstOrDefaultAsync(item => item.Id == id);
        }

        public async Task Insert(Receita receita)
        {
            _receita.Add(receita);
            await _receita.SaveChangesAsync();
        }

        public async Task Update(Receita receita)
        {
            _receita.Receitas.Update(receita);
            await _receita.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _receita.Remove(this.Find(id));
            await _receita.SaveChangesAsync();
        }
    }
}