import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CurrentCountComponent } from './current-count.component';
import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';

describe('CurrentCountComponent', () => {
  let component: CurrentCountComponent;
  let fixture: ComponentFixture<CurrentCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CurrentCountComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SanctionedEntitiesService,
        { provide: 'BASE_URL', useValue: '/' }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with count 0, then increments by 1 when clicked', () => {
    const countElement = fixture.nativeElement.querySelector('strong');
    expect(countElement.textContent).toEqual('0');

    const incrementButton = fixture.nativeElement.querySelector('button');
    incrementButton.click();
    fixture.detectChanges();
    expect(countElement.textContent).toEqual('1');
  });
});
