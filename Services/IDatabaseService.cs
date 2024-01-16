using ajgre_technical_interview.Models;

namespace ajgre_technical_interview.Services
{
    public interface IDatabaseService
    {
        Task<IList<SanctionedEntity>> GetSanctionedEntitiesAsync(Func<SanctionedEntity, bool>? filter = null);

        Task<SanctionedEntity> GetSanctionedEntityByIdAsync(Guid id);

        Task<SanctionedEntity> CreateSanctionedEntityAsync(SanctionedEntity sanctionedEntity);

        Task<int> GetSanctionedEntitiesCountAsync();

        Task UpdateSanctionedEntitiesCountAsync(int count);
    }
}