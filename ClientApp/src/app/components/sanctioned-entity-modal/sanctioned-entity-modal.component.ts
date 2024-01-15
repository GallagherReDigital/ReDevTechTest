import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { SanctionedEntity } from '../../models/sanctioned-entity';
import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';

@Component({
  selector: 'sanctioned-entity-modal',
  templateUrl: './sanctioned-entity-modal.component.html'
})
export class SanctionedEntityModal {
  public entity: SanctionedEntity = {
    id: '',
    name: '',
    domicile: '',
    accepted: false
  };

  constructor(private entityService: SanctionedEntitiesService) {

  }
}
