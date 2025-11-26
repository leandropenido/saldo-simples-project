using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaldoSimples.Interfaces;
using SaldoSimples.Models;

namespace SaldoSimples.Controllers
{
  public enum DespesaErrorCode
	{
		DespesaRegisterInvalid,
		DespesaIdInUse,
		DespesaNotFound,
		CouldNotCreateDespesa,
		CouldNotUpdateDespesa,
		CouldNotDeleteDespesa
	}

  [Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class DespesaController : ControllerBase
	{
		private readonly IDespesaRepository _despesaRepository;

		public DespesaController(IDespesaRepository despesaRepository)
		{
			_despesaRepository = despesaRepository;
		}


		[HttpGet]
		public async Task<IActionResult> List()
		{
			return Ok(await _despesaRepository.All());
		}

		[HttpGet("user/{userId}")]
		public async Task<IActionResult> GetDespesaByUser(int userId)

    {
      var despesas = await _despesaRepository.GetDespesaByUser(userId);
			return Ok(despesas);
    }

		[HttpPost("user/{userId}")]
		public async Task<IActionResult> Create(int userId, [FromBody] Despesa despesa)
		{
			try
			{
				if (despesa == null || !ModelState.IsValid)
				{
					return BadRequest(DespesaErrorCode.DespesaRegisterInvalid.ToString());
				}
				bool itemExists = await _despesaRepository.DoesItemExist(despesa.Id);
				if (itemExists)
				{
					return StatusCode(StatusCodes.Status409Conflict, DespesaErrorCode.DespesaIdInUse.ToString());
				}

				despesa.UserId = userId;

				await _despesaRepository.Insert(despesa);
			}
			catch (Exception)
			{
				return BadRequest(DespesaErrorCode.CouldNotCreateDespesa.ToString());
			}
			return Ok(despesa);
		}

		[HttpPut("user/{userId}")]
		public async Task<IActionResult> Edit(int userId, [FromBody] Despesa despesa)
		{
			try
			{
				
				if (despesa == null || !ModelState.IsValid)
				{
					return BadRequest(DespesaErrorCode.DespesaRegisterInvalid.ToString());
				}
				var existingDespesa = await _despesaRepository.Find(despesa.Id);
				if (existingDespesa == null)
				{
					return NotFound(DespesaErrorCode.DespesaNotFound.ToString());
				}
				existingDespesa.Categoria = despesa.Categoria;
				existingDespesa.Valor = despesa.Valor;
				existingDespesa.Recorrente = despesa.Recorrente;
				existingDespesa.UserId = userId;

				await _despesaRepository.Update(existingDespesa);
			}
			catch (Exception)
			{
				return BadRequest(DespesaErrorCode.CouldNotUpdateDespesa.ToString());
			}
			return Ok(despesa);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			try
			{
				var despesa = await _despesaRepository.Find(id);
				if (despesa == null)
				{
					return NotFound(DespesaErrorCode.DespesaNotFound.ToString());
				}
				await _despesaRepository.Delete(id);
			}
			catch (Exception)
			{
				return BadRequest(DespesaErrorCode.CouldNotDeleteDespesa.ToString());
			}
			return NoContent();
		}
	}
}