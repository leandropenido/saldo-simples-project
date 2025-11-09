using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace SaldoSimples.Models;

[Table("Receita")]

public class Receita
{
  [Key]
  public int Id { get; set; }

  [ForeignKey("User")]
  public int UserId { get; set; }

  [Required]
  public decimal Valor { get; set; }

  [Required]
  public string OrigemReceita { get; set; }

  [Required]
  public bool Recorrente { get; set; }
  public DateTime DataCriacao { get; set; }
  public DateTime DataAtualizacao { get; set; }

}