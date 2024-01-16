import { Component } from '@angular/core';

import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';

@Component({
  selector: 'app-jumbotron-counter',
  templateUrl: './jumbotron-counter.component.html'
})
export class JumbotronCounterComponent {
  public counterCurrentCount: number = 0;

  constructor(private entitiesService: SanctionedEntitiesService) {
    this.entitiesService.getSanctionedEntitiesCount()
      .subscribe(count => this.counterCurrentCount = count);
  }
}
