import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutEndComponent } from './workout-end.component';
import { WorkoutService } from '../workout.service';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('WorkoutEndComponent', () => {
  let component: WorkoutEndComponent;
  let fixture: ComponentFixture<WorkoutEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule, HttpClientModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ WorkoutEndComponent],
      providers: [WorkoutService, DatePipe]
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
