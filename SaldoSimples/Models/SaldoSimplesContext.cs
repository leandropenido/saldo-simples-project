using Microsoft.EntityFrameworkCore;

namespace SaldoSimples.Models
{
  public class SaldoSimplesContext : DbContext
  {
    public SaldoSimplesContext(DbContextOptions<SaldoSimplesContext> options) : base(options)
    {

    }
    public DbSet<User> Users { get; set; }
    public DbSet<Receita> Receitas { get; set; }
    public DbSet<Orcamento> Orcamentos { get; set; }
    public DbSet<Despesa> Despesas { get; set; }
    public DbSet<Insight> Insights { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<Despesa>()
        .Property(d => d.Categoria)
        .HasColumnType("varchar(100)")
        .HasConversion<string>();

      modelBuilder.Entity<Insight>()
        .Property(i => i.Categoria)
        .HasColumnType("varchar(300)")
        .HasConversion<string>();
    }
  }

}
