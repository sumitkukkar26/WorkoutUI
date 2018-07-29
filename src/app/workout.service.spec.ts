import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkoutService } from './workout.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WorkoutModel } from './workout-model';
import { Category } from './category';
import { WorkoutDetails } from './workout-details';
import { DatePipe } from '@angular/common';

describe('WorkoutService', () => {

  let service: WorkoutService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let workoutUrl = "http://localhost:8090/workout";
  let httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkoutService]
    });

    service = TestBed.get(WorkoutService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Testing getWorkout()', () => {
    const expectedWorkouts : WorkoutModel[] =[
      {workoutId : 100, workoutNote : 'Good For Health',workoutTitle:'Morning Yoga', caloriesBurnPerMin: 10, category: new Category() },
      {workoutId : 101, workoutNote : 'Slow',workoutTitle:'Evening Walk', caloriesBurnPerMin: 20, category: new Category() }
    ];

    httpClient.get<WorkoutModel[]>(workoutUrl+"/getAllWorkouts").subscribe(
      workouts => expect(workouts).toEqual(expectedWorkouts)
    );

    const req = httpTestingController.expectOne(workoutUrl+"/getAllWorkouts");
    expect(req.request.method).toEqual('GET');
    req.flush(expectedWorkouts);

  });

  it('Testing saveWorkout()', () => {
    const expectedWorkout : WorkoutModel =
      {workoutId : 100, workoutNote : 'Good For Health',workoutTitle:'Morning Yoga', caloriesBurnPerMin: 10, category: new Category() };

    httpClient.post<WorkoutModel>(workoutUrl+"/saveWorkout",expectedWorkout, httpOptions).subscribe(
      workout => expect(workout).toEqual(expectedWorkout)
    );

    const req = httpTestingController.expectOne(workoutUrl+"/saveWorkout");
    expect(req.request.method).toEqual('POST');
    req.flush(expectedWorkout);

  });

  it('Testing startWorkout()', () => {
    const currentDate = new Date();
    const expectedWorkout : WorkoutDetails =
      {startDate: currentDate, startTime: currentDate, endDate: null ,endTime: null, status: true, workout: new WorkoutModel(), comment: "Starting..."};

    httpClient.post<WorkoutDetails>(workoutUrl+"/startWorkout",expectedWorkout, httpOptions).subscribe(
      workout => expect(workout).toEqual(expectedWorkout)
    );

    const req = httpTestingController.expectOne(workoutUrl+"/startWorkout");
    expect(req.request.method).toEqual('POST');
    req.flush(expectedWorkout);

  });

  it('Testing endWorkout()', () => {
    const currentDate = new Date();
    const expectedWorkout : WorkoutDetails =
      {endDate: currentDate, endTime: currentDate, startDate: null ,startTime: null, status: true, workout: new WorkoutModel(), comment: "Starting..."};

    httpClient.post<WorkoutDetails>(workoutUrl+"/endWorkout",expectedWorkout, httpOptions).subscribe(
      workout => expect(workout).toEqual(expectedWorkout)
    );

    const req = httpTestingController.expectOne(workoutUrl+"/endWorkout");
    expect(req.request.method).toEqual('POST');
    req.flush(expectedWorkout);

  });

  afterEach(()=> {
    httpTestingController.verify();
  })


});
