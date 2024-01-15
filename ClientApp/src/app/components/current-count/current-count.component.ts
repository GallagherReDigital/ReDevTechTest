import { Component, Input } from '@angular/core';

@Component({
  selector: 'counter-current-count',
  templateUrl: './current-count.component.html'
})
export class CurrentCountComponent {
  @Input() count = -1;
}
