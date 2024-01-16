using ajgre_technical_interview.Models;
using ajgre_technical_interview.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace ajgre_technical_interview.Controllers
{
    [ApiController]
    [Route("api/sanctioned-entities")]
    public class SanctionedEntitiesController : ControllerBase
    {
        private readonly IDatabaseService _databaseService;

        public SanctionedEntitiesController(IDatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSanctionedEntities()
        {
            try
            {
                var entities = await _databaseService.GetSanctionedEntitiesAsync();
                return Ok(entities);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<SanctionedEntity>> CreateSanctionedEntityAsync(SanctionedEntity entity)
        {
            try
            {
                var sameNameInDomicile = (await _databaseService
                    .GetSanctionedEntitiesAsync(se => se.Name == entity.Name && se.Domicile == entity.Domicile)).Any();
                if (sameNameInDomicile)
                    return Conflict($"An entity with the name {entity.Name} already exist in {entity.Domicile}");

                var addedEntity = await _databaseService.CreateSanctionedEntityAsync(entity);

                return CreatedAtAction(nameof(GetSanctionedEntities), addedEntity);
            }
            catch (Exception ex)
            {
                return Problem(detail: ex.Message, statusCode: StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetSanctionedEntitiesCountAsync()
        {
            try
            {
                var count = await _databaseService.GetSanctionedEntitiesCountAsync();

                return Ok(count);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpPost("new-count/{count:int}")]
        public async Task<IActionResult> UpdateSanctionedEntitiesCountAsync(int count)
        {
            try
            {
                await _databaseService.UpdateSanctionedEntitiesCountAsync(count);

                return Ok();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
