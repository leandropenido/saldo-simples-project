using SaldoSimples.Interfaces;
using SaldoSimples.Models;
using Microsoft.EntityFrameworkCore;

namespace SaldoSimples.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly SaldoSimplesContext _user;

        public UserRepository(SaldoSimplesContext user)
        {
            _user = user;
        }

        public async Task<IEnumerable<User>> All()
        {
            return await _user.Users.ToListAsync();
        }

        public async Task<bool> DoesItemExist(int id)
        {
            return await _user.Users.AnyAsync(item => item.Id == id);
        }

        public async Task<User?> Find(int id)
        {
            return await _user.Users.FirstOrDefaultAsync(item => item.Id == id);
        }

        public async Task<User?> FindByEmail(string email)
        {
            return await _user.Users.FirstOrDefaultAsync(item => item.Email == email);
        }

        public async Task Insert(User user)
        {
            _user.Add(user);
            await _user.SaveChangesAsync();
        }

        public async Task Update(User user)
        {
            _user.Users.Update(user);
            await _user.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _user.Remove(this.Find(id));
            await _user.SaveChangesAsync();
        }
    }
}