using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static SaldoSimples.Constants.DespesaEnum;
namespace SaldoSimples.Models;

[Table("Insight")]

public class Insight
{
  [Key]
  public int Id { get; set; }

  [ForeignKey("Orcamento")]
  public int OrcamentoId { get; set; }

  [Required]
  public string Descricao { get; set; }

  public Categoria Categoria { get; set; }

  [Required]
  public string Titulo { get; set; }
  public DateTime DataCriacao { get; set; }
  public DateTime DataAtualizacao { get; set; }

}