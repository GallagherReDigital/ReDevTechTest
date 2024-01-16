import { Component, Input } from '@angular/core';

import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';

@Component({
  selector: 'counter-current-count',
  templateUrl: './current-count.component.html'
})
export class CurrentCountComponent {
  public currentCount: number = 0;

  constructor(private entitiesService: SanctionedEntitiesService) {
    this.entitiesService.getSanctionedEntitiesCount()
      .subscribe(count => this.currentCount = count);
  }

  public incrementCounter() {
    this.currentCount++;
    this.entitiesService.updateSanctionedEntitiesCount(this.currentCount)
      .subscribe();
  }
}
