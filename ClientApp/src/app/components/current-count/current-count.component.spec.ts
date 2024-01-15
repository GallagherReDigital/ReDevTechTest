import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCountComponent } from './current-count.component';

describe('CurrentCountComponent', () => {
  let component: CurrentCountComponent;
  let fixture: ComponentFixture<CurrentCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
