import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutStartComponent } from './workout-start.component';
import { WorkoutService } from '../workout.service';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('WorkoutStartComponent', () => {
  let component: WorkoutStartComponent;
  let fixture: ComponentFixture<WorkoutStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule, HttpClientModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ WorkoutStartComponent],
      providers: [WorkoutService, DatePipe]
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
