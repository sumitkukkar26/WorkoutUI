import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkoutService]
    });
  });

  it('should be created', inject([HttpTestingController,WorkoutService], (httpClient: HttpTestingController,service: WorkoutService) => {
    expect(service).toBeTruthy();
  }));
});
