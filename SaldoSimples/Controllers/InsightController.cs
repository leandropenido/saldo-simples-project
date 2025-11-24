using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaldoSimples.Interfaces;
using SaldoSimples.Models;


namespace SaldoSimples.Controllers
{
  public enum InsightErrorCode
	{
		InsightRegisterInvalid,
		InsightIdInUse,
		InsightNotFound,
		CouldNotCreateInsight,
		CouldNotUpdateInsight,
		CouldNotDeleteInsight
	}

  [Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class InsightController : ControllerBase
	{
		private readonly IInsightRepository _insightRepository;

		public InsightController(IInsightRepository insightRepository)
		{
			_insightRepository = insightRepository;
		}


		[HttpGet]
		public async Task<IActionResult> List()
		{
			return Ok(await _insightRepository.All());
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] Insight insight)
		{
			try
			{
				if (insight == null || !ModelState.IsValid)
				{
					return BadRequest(InsightErrorCode.InsightRegisterInvalid.ToString());
				}
				bool itemExists = await _insightRepository.DoesItemExist(insight.Id);
				if (itemExists)
				{
					return StatusCode(StatusCodes.Status409Conflict, InsightErrorCode.InsightIdInUse.ToString());
				}

				await _insightRepository.Insert(insight);
			}
			catch (Exception)
			{
				return BadRequest(InsightErrorCode.CouldNotCreateInsight.ToString());
			}
			return Ok(insight);
		}

		[HttpPut]
		public async Task<IActionResult> Edit([FromBody] Insight insight)
		{
			try
			{
				
				if (insight == null || !ModelState.IsValid)
				{
					return BadRequest(InsightErrorCode.InsightRegisterInvalid.ToString());
				}
				var existingInsight = await _insightRepository.Find(insight.Id);
				if (existingInsight == null)
				{
					return NotFound(InsightErrorCode.InsightNotFound.ToString());
				}
				existingInsight.Descricao = insight.Descricao;
				existingInsight.Titulo = insight.Titulo;
				existingInsight.Categoria = insight.Categoria;
				
				await _insightRepository.Update(existingInsight);
			}
			catch (Exception)
			{
				return BadRequest(InsightErrorCode.CouldNotUpdateInsight.ToString());
			}
			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			try
			{
				var insight = await _insightRepository.Find(id);
				if (insight == null)
				{
					return NotFound(InsightErrorCode.InsightNotFound.ToString());
				}
				await _insightRepository.Delete(id);
			}
			catch (Exception)
			{
				return BadRequest(InsightErrorCode.CouldNotDeleteInsight.ToString());
			}
			return NoContent();
		}
	}
}