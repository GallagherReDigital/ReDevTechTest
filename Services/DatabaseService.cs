using ajgre_technical_interview.Models;

namespace ajgre_technical_interview.Services
{
    public class DatabaseService : IDatabaseService
    {
        private static readonly IList<SanctionedEntity> SanctionedEntities = new List<SanctionedEntity>
        {
            new SanctionedEntity { Name = "Forbidden Company", Domicile = "Mars", Accepted = false },
            new SanctionedEntity { Name = "Allowed Company", Domicile = "Venus", Accepted = true },
            new SanctionedEntity { Name = "Good Ltd", Domicile = "Saturn", Accepted = true },
            new SanctionedEntity { Name = "Evil Plc", Domicile = "Venus", Accepted = false }
        };

        public async Task<IList<SanctionedEntity>> GetSanctionedEntitiesAsync(Func<SanctionedEntity, bool>? filter = null)
        {
            var query = filter is not null ? SanctionedEntities.Where(filter) : SanctionedEntities;

            var entities = query
                .OrderBy(e => e.Name)
                .ThenBy(e => e.Domicile)
                .ToList();

            return await Task.FromResult(entities);
        }

        public async Task<SanctionedEntity> GetSanctionedEntityByIdAsync(Guid id)
        {
            return await Task.FromResult(SanctionedEntities.First(e => e.Id.Equals(id)));
        }

        public async Task<SanctionedEntity> CreateSanctionedEntityAsync(SanctionedEntity sanctionedEntity)
        {
            SanctionedEntities.Add(sanctionedEntity);
            return await Task.FromResult(sanctionedEntity);
        }

        private int _sanctionedEntitiesCount;

        public Task<int> GetSanctionedEntitiesCountAsync()
        {
            if (_sanctionedEntitiesCount == 0)
                _sanctionedEntitiesCount = SanctionedEntities.Count(c => !c.Accepted);

            return Task.FromResult(_sanctionedEntitiesCount);
        }

        public async Task UpdateSanctionedEntitiesCountAsync(int count)
        {
            _sanctionedEntitiesCount = count;

            await Task.Delay(0);
        }
    }
}