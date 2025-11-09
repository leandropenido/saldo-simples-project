using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static SaldoSimples.Constants.DespesaEnum;
namespace SaldoSimples.Models;

[Table("Despesa")]

public class Despesa
{
  [Key]
  public int Id { get; set; }

  [ForeignKey("User")]
  public int UserId { get; set; }

  [Required]
  public Categoria Categoria { get; set; }

  [Required]
  public decimal Valor { get; set; }

  [Required]
  public bool Recorrente { get; set; }
  public DateTime DataCriacao { get; set; }
  public DateTime DataAtualizacao { get; set; }

}