import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SanctionedEntity } from '../../models/sanctioned-entity';
import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';
import { SanctionedEntityEditorService } from '../../services/sanctioned-entity-editor.service';

@Component({
  selector: 'sanctioned-entity-modal',
  templateUrl: './sanctioned-entity-modal.component.html'
})
export class SanctionedEntityModal {
  @Input() entities: SanctionedEntity[] = [];

  @Output() entityAdded = new EventEmitter<SanctionedEntity>();

  public isValidForm: boolean = false;
  
  constructor(
    private entityService: SanctionedEntitiesService,
    private entityEditorService: SanctionedEntityEditorService)
  {
    this.entityEditorService.entityFormStatusChanged$
      .subscribe(valid => this.isValidForm = valid);
  }

  submitForm() {
    if (this.isValidForm) {
      this.entityEditorService.addEntity();
    }
  }

  addEntity(entity: SanctionedEntity) {
    const entityExists = this.entities
      .some(e => e.name === entity.name && e.domicile === entity.domicile);

    if (entityExists) {
      const error = `Entity with the same properties already exist...`;
      console.warn(error);

      this.entityEditorService.addEntityResult(false);
      return;
    }

    this.entityService.addSanctionedEntity(entity)
      .subscribe(e => this.entityAdded.emit(e));
    this.entityEditorService.addEntityResult(true);
  }

  onFormStatusChange(status: boolean) {
    this.isValidForm = status;
  }
}
