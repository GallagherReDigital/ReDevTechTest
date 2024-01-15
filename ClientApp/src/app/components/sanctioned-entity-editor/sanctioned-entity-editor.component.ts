import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'sanctioned-entity-editor',
  templateUrl: './sanctioned-entity-editor.component.html'
})
export class SanctionedEntityEditor {
  entityForm = this.formBuilder.group({
    id: [uuidv4()],
    name: ['', Validators.required],
    domicile: ['', Validators.required],
    accepted: [false]
  });

  constructor(private formBuilder: FormBuilder) { }

  onSubmit()
  {
    console.info(this.entityForm.value);
  }
}
