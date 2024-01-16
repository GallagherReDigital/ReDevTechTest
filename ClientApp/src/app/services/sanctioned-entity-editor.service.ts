import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SanctionedEntityEditorService {
  private addEntityRequestSource = new Subject();
  private addEntityResultSource = new Subject<boolean>();
  private entityFormStatusChangedSource = new Subject<boolean>();

  addEntityRequest$ = this.addEntityRequestSource.asObservable();
  addEntityResult$ = this.addEntityResultSource.asObservable();
  entityFormStatusChanged$ = this.entityFormStatusChangedSource.asObservable();

  addEntity() {
    this.addEntityRequestSource.next('');
  }

  addEntityResult(success: boolean) {
    this.addEntityResultSource.next(success);
  }

  entityFormStatusChanged(status: boolean) {
    this.entityFormStatusChangedSource.next(status);
  }
}
