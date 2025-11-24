using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using static SaldoSimples.Constants.DespesaEnum;


namespace SaldoSimples.Models;

[Table("Orcamento")]

public class Orcamento
{
  [Key]
  public int Id { get; set; }

  [ForeignKey("User")]
  public int UserId { get; set; }

  [Required]
  public decimal Saldo { get; set; }

  public decimal Meta { get; set; }
  
  public Categoria Categoria {get;set;}

  [Required]
  public bool Recorrente { get; set; }
  public DateTime DataCriacao { get; set; }
  public DateTime DataAtualizacao { get; set; }

}