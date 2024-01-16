import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { SanctionedEntity } from '../../models/sanctioned-entity';
import { SanctionedEntityEditorService } from '../../services/sanctioned-entity-editor.service';

@Component({
  selector: 'sanctioned-entity-editor',
  templateUrl: './sanctioned-entity-editor.component.html',
  styleUrls: ['./sanctioned-entity-editor.component.css']
})
export class SanctionedEntityEditor implements OnDestroy {
  private entityFormStatusChangeSubs: Subscription;
  private addEntityRequestSubs: Subscription;
  private addEntityResultSubs: Subscription;

  @Output() addEntityRequest = new EventEmitter<SanctionedEntity>();
  @Output() formStatusChanged = new EventEmitter<boolean>();

  public addEntityFailed: boolean = false;
  public statusLabel: string = 'Rejected';
  public entityForm = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    domicile: ['', Validators.required],
    accepted: [false]
  });

  constructor(
    private formBuilder: FormBuilder,
    private entityEditorService: SanctionedEntityEditorService)
  {
      this.entityFormStatusChangeSubs = this.entityForm.statusChanges
        .subscribe(() => this.formStatusChanged.emit(this.entityForm.valid));

      this.addEntityRequestSubs = this.entityEditorService.addEntityRequest$
        .subscribe(() => this.submit());

      this.addEntityResultSubs = this.entityEditorService.addEntityResult$
        .subscribe(success => this.submitResult(success));
  }

  statusSwitchChange(e: any) {
    //console.info(e);
    this.statusLabel = e.target.checked ? 'Accepted' : 'Rejected';
  }

  submit() {
    const entity = <SanctionedEntity>Object.setPrototypeOf(this.entityForm.value, null);
    // console.info(entity);
    this.addEntityRequest.emit(entity);
  }

  submitResult(success: boolean) {
    this.addEntityFailed = !success;
    console.info(`Submit new sanctioned entity: ${success}`);
    if (success) this.entityForm.reset();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.entityFormStatusChangeSubs.unsubscribe();
    this.addEntityRequestSubs.unsubscribe();
    this.addEntityResultSubs.unsubscribe();
  }
}
