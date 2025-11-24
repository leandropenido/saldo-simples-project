using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaldoSimples.Interfaces;
using SaldoSimples.Models;


namespace SaldoSimples.Controllers
{
  public enum ReceitaErrorCode
	{
		ReceitaRegisterInvalid,
		ReceitaIdInUse,
		ReceitaNotFound,
		CouldNotCreateReceita,
		CouldNotUpdateReceita,
		CouldNotDeleteReceita
	}

  [Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class ReceitaController : ControllerBase
	{
		private readonly IReceitaRepository _receitaRepository;

		public ReceitaController(IReceitaRepository receitaRepository)
		{
			_receitaRepository = receitaRepository;
		}


		[HttpGet]
		public async Task<IActionResult> List()
		{
			return Ok(await _receitaRepository.All());
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] Receita receita)
		{
			try
			{
				if (receita == null || !ModelState.IsValid)
				{
					return BadRequest(ReceitaErrorCode.ReceitaRegisterInvalid.ToString());
				}
				bool itemExists = await _receitaRepository.DoesItemExist(receita.Id);
				if (itemExists)
				{
					return StatusCode(StatusCodes.Status409Conflict, ReceitaErrorCode.ReceitaIdInUse.ToString());
				}

				await _receitaRepository.Insert(receita);
			}
			catch (Exception)
			{
				return BadRequest(ReceitaErrorCode.CouldNotCreateReceita.ToString());
			}
			return Ok(receita);
		}

		[HttpPut]
		public async Task<IActionResult> Edit([FromBody] Receita receita)
		{
			try
			{
				
				if (receita == null || !ModelState.IsValid)
				{
					return BadRequest(ReceitaErrorCode.ReceitaRegisterInvalid.ToString());
				}
				var existingReceita = await _receitaRepository.Find(receita.Id);
				if (existingReceita == null)
				{
					return NotFound(ReceitaErrorCode.ReceitaNotFound.ToString());
				}

				await _receitaRepository.Update(existingReceita);
			}
			catch (Exception)
			{
				return BadRequest(ReceitaErrorCode.CouldNotUpdateReceita.ToString());
			}
			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			try
			{
				var receita = await _receitaRepository.Find(id);
				if (receita == null)
				{
					return NotFound(ReceitaErrorCode.ReceitaNotFound.ToString());
				}
				await _receitaRepository.Delete(id);
			}
			catch (Exception)
			{
				return BadRequest(ReceitaErrorCode.CouldNotDeleteReceita.ToString());
			}
			return NoContent();
		}
	}
}