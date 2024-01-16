import { Component } from '@angular/core';
import { SanctionedEntity } from '../../models/sanctioned-entity';
import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';

@Component({
  selector: 'app-sanctioned-entities',
  templateUrl: './sanctioned-entities.component.html'
})
export class SanctionedEntitiesComponent {
  public entities: SanctionedEntity[] = [];

  constructor(private entitiesService: SanctionedEntitiesService) {
    this.entitiesService.getSanctionedEntities().subscribe(entities => {
      this.entities = entities;
    });
  }

  onEntityAdded(entity: SanctionedEntity) {
    this.entities.push(entity);
  }
}
