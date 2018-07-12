import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutEndComponent } from './workout-end.component';

describe('WorkoutEndComponent', () => {
  let component: WorkoutEndComponent;
  let fixture: ComponentFixture<WorkoutEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
