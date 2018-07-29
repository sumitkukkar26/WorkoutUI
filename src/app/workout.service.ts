import { Injectable, Output, EventEmitter } from '@angular/core';
import { WorkoutModel } from './workout-model';
import { Subject }    from 'rxjs/Subject';
import { delay } from 'q';
import { WorkoutDetails } from './workout-details';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WorkoutService {
  startFlag = false;
  index: Number;
  private activeWorkoutDetails : WorkoutDetails;
  private workoutUrl = "http://localhost:8090/workout";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient){}

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  saveWorkout(workout: WorkoutModel): Observable<WorkoutModel> {
    return this.http.post<WorkoutModel>(this.workoutUrl+"/addWorkout",workout,this.httpOptions);
  }

  getWorkout(): Observable<WorkoutModel[]> {
    return this.http.get<WorkoutModel[]>(this.workoutUrl+"/getAllWorkouts");
  }

  getWorkoutByIndex(index: number): Observable<WorkoutModel> {
    return this.http.get<WorkoutModel>(this.workoutUrl+"/getWorkoutById/"+index);

  }

  public deleteWorkout(work: WorkoutModel): Observable<WorkoutModel> {
    return this.http.post<WorkoutModel>(this.workoutUrl+"/deleteWorkout", work, this.httpOptions);
  }

  public startWorkout(work: WorkoutDetails): Observable<WorkoutDetails> {
    this.index = work.workout.workoutId;
    this.activeWorkoutDetails = work;
    this.startFlag = true;
    this.change.emit(this.startFlag);
    return this.http.post<WorkoutDetails>(this.workoutUrl+"/startWorkout",work,this.httpOptions);
  }

  public endWorkout(work: WorkoutDetails): Observable<WorkoutDetails> {
    this.index = work.workout.workoutId;
    this.activeWorkoutDetails = null;
    this.startFlag = false;
    this.change.emit(this.startFlag);
    return this.http.post<WorkoutDetails>(this.workoutUrl+"/endWorkout",work,this.httpOptions);
  }

  getStartFlag(): boolean {
    return this.startFlag;
  }

  setStartFlag(flag:boolean): void {
    this.startFlag = flag;
  }

  getIndex(): Number {
    return this.index;
  }

  getActiveWorkoutDetails(): WorkoutDetails {
    return this.activeWorkoutDetails;
  }

  getWorkoutDetails() : Observable<WorkoutDetails[]> {
    return this.http.get<WorkoutDetails[]>(this.workoutUrl+"/getAllWorkoutActive");
  }

}
