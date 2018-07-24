import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchWorkoutPipe } from '../search-workout.pipe';
import { WorkoutService } from '../workout.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const router = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports:[FormsModule, HttpClientModule],
    declarations: [ DashboardComponent, SearchWorkoutPipe, ],
    providers: [WorkoutService,
    {provide: Router, useValue: router}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
