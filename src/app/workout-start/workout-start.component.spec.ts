import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutStartComponent } from './workout-start.component';

describe('WorkoutStartComponent', () => {
  let component: WorkoutStartComponent;
  let fixture: ComponentFixture<WorkoutStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
