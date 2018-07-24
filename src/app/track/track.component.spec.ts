import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackComponent } from './track.component';
import { ChartModule } from 'angular-highcharts';
import { WorkoutService } from '../workout.service';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('TrackComponent', () => {
  let component: TrackComponent;
  let fixture: ComponentFixture<TrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackComponent ],
      imports:[ChartModule, HttpClientModule],
      providers: [WorkoutService, DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
