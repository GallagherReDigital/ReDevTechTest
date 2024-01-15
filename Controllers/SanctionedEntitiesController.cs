using ajgre_technical_interview.Services;
using Microsoft.AspNetCore.Mvc;

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
