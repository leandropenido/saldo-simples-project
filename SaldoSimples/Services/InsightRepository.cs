using SaldoSimples.Interfaces;
using SaldoSimples.Models;
using Microsoft.EntityFrameworkCore;

namespace SaldoSimples.Services
{
    public class InsightRepository : IInsightRepository
    {
        private readonly SaldoSimplesContext _insight;

        public InsightRepository(SaldoSimplesContext insight)
        {
            _insight = insight;
        }

        public async Task<IEnumerable<Insight>> All()
        {
            return await _insight.Insights.ToListAsync();
        }

        public async Task<bool> DoesItemExist(int id)
        {
            return await _insight.Insights.AnyAsync(item => item.Id == id);
        }

        public async Task<Insight?> Find(int id)
        {
            return await _insight.Insights.FirstOrDefaultAsync(item => item.Id == id);
        }

        public async Task Insert(Insight insight)
        {
            _insight.Add(insight);
            await _insight.SaveChangesAsync();
        }

        public async Task Update(Insight insight)
        {
            _insight.Insights.Update(insight);
            await _insight.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _insight.Remove(this.Find(id));
            await _insight.SaveChangesAsync();
        }
    }
}