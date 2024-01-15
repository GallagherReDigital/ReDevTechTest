import { Component } from '@angular/core';

import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount: number = 0;

  constructor(private entitiesService: SanctionedEntitiesService) {
    this.entitiesService.getSanctionedEntitiesCount().subscribe(count => this.currentCount = count);
  }

  public incrementCounter() {
    this.currentCount++;
    this.entitiesService.updateSanctionedEntitiesCount(this.currentCount).subscribe();
  }
}
