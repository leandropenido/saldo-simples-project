using SaldoSimples.Interfaces;
using SaldoSimples.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace SaldoSimples.Services
{
    public class DespesaRepository : IDespesaRepository
    {
        private readonly SaldoSimplesContext _despesa;

        public DespesaRepository(SaldoSimplesContext despesa)
        {
            _despesa = despesa;
        }

        public async Task<IEnumerable<Despesa>> All()
        {
            return await _despesa.Despesas.ToListAsync();
        }


        public async Task<List<Despesa>> GetDespesaByUser(int userId)
        {
            return await _despesa.Despesas.Where(o => o.UserId == userId).ToListAsync();
        }

        public async Task<bool> DoesItemExist(int id)
        {
            return await _despesa.Despesas.AnyAsync(item => item.Id == id);
        }

        public async Task<Despesa?> Find(int id)
        {
            return await _despesa.Despesas.FirstOrDefaultAsync(item => item.Id == id);
        }

        public async Task Insert(Despesa despesa)
        {
            _despesa.Add(despesa);
            await _despesa.SaveChangesAsync();
        }

        public async Task Update(Despesa despesa)
        {
            _despesa.Despesas.Update(despesa);
            await _despesa.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _despesa.Remove(this.Find(id));
            await _despesa.SaveChangesAsync();
        }
    }
}