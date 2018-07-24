import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkoutModel } from '../workout-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
  workouts = [];
  startFlag :boolean;
  index: Number;
  query: string;
 
  constructor(private ws: WorkoutService, private router: Router) { 
  }

  ngOnInit() {
    this.index = this.ws.getIndex();
    this.startFlag = this.ws.getStartFlag();
    this.getWorkoutList();
  }

  getWorkoutList(): void {
     this.ws.getWorkout().subscribe(workouts => this.workouts = workouts);
  }

  deleteWorkout(workout: WorkoutModel): void {
    this.ws.deleteWorkout(workout).subscribe();
    this.workouts = this.workouts.filter(w => w != workout);
  }

  startWorkout(workout: WorkoutModel): void {
    if(this.startFlag == true) {
      alert("You can start only one Workout at a time");
      return;
    }
     this.router.navigate(["/startWorkout",workout.workoutId]); 
  }

  editWorkout(workout: WorkoutModel): void {
     this.router.navigate(["/editWorkout",workout.workoutId]);
  }

  endWorkout(workout: WorkoutModel): void {
    this.router.navigate(["/endWorkout",workout.workoutId]);
  }


  setDisabled(workout: WorkoutModel): boolean {
    if(workout.workoutId == this.index && this.startFlag) {
      return true;
    }
    return false;
  }
}
