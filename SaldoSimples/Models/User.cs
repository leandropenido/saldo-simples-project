using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SaldoSimples.Models;

[Table("Users")]

public class User
{
  [Key]
  public int Id { get; set; }

  [Required]
  public string UserName { get; set; }

  [Required]
  public string Email { get; set; }

  [Required]
  public string CPF { get; set; }

  
  public byte[]? Senha { get; set; }

  [Required]
  [NotMapped]
  public string SenhaString { get; set; }

  public string? Foto { get; set; }
  public DateTime DataCriacao { get; set; }
  public DateTime DataAtualizacao { get; set; }

  [NotMapped]
  public IFormFile? UploadedFoto { get; set; }
}