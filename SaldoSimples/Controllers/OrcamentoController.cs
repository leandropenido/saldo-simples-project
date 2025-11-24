using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaldoSimples.Interfaces;
using SaldoSimples.Models;


namespace SaldoSimples.Controllers
{
  public enum OrcamentoErrorCode
	{
		OrcamentoRegisterInvalid,
		OrcamentoIdInUse,
		OrcamentoNotFound,
		CouldNotCreateOrcamento,
		CouldNotUpdateOrcamento,
		CouldNotDeleteOrcamento
	}

  [Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class OrcamentoController : ControllerBase
	{
		private readonly IOrcamentoRepository _orcamentoRepository;

		public OrcamentoController(IOrcamentoRepository orcamentoRepository)
		{
			_orcamentoRepository = orcamentoRepository;
		}


		[HttpGet]
		public async Task<IActionResult> List()
		{
			return Ok(await _orcamentoRepository.All());
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] Orcamento orcamento)
		{
			try
			{
				if (orcamento == null || !ModelState.IsValid)
				{
					return BadRequest(OrcamentoErrorCode.OrcamentoRegisterInvalid.ToString());
				}
				bool itemExists = await _orcamentoRepository.DoesItemExist(orcamento.Id);
				if (itemExists)
				{
					return StatusCode(StatusCodes.Status409Conflict, OrcamentoErrorCode.OrcamentoIdInUse.ToString());
				}

				await _orcamentoRepository.Insert(orcamento);
			}
			catch (Exception)
			{
				return BadRequest(OrcamentoErrorCode.CouldNotCreateOrcamento.ToString());
			}
			return Ok(orcamento);
		}

		[HttpPut]
		public async Task<IActionResult> Edit([FromBody] Orcamento orcamento)
		{
			try
			{
				
				if (orcamento == null || !ModelState.IsValid)
				{
					return BadRequest(OrcamentoErrorCode.OrcamentoRegisterInvalid.ToString());
				}
				var existingOrcamento = await _orcamentoRepository.Find(orcamento.Id);
				if (existingOrcamento == null)
				{
					return NotFound(OrcamentoErrorCode.OrcamentoNotFound.ToString());
				}

				existingOrcamento.Saldo = orcamento.Saldo;
				existingOrcamento.Meta = orcamento.Meta;
				existingOrcamento.Categoria = orcamento.Categoria;
			
				await _orcamentoRepository.Update(existingOrcamento);
			}
			catch (Exception)
			{
				return BadRequest(OrcamentoErrorCode.CouldNotUpdateOrcamento.ToString());
			}
			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			try
			{
				var orcamento = await _orcamentoRepository.Find(id);
				if (orcamento == null)
				{
					return NotFound(OrcamentoErrorCode.OrcamentoNotFound.ToString());
				}
				await _orcamentoRepository.Delete(id);
			}
			catch (Exception)
			{
				return BadRequest(OrcamentoErrorCode.CouldNotDeleteOrcamento.ToString());
			}
			return NoContent();
		}
	}
}