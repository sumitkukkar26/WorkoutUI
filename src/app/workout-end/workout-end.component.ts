import { Component, OnInit } from '@angular/core';
import { WorkoutModel } from '../workout-model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WorkoutService } from '../workout.service';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-workout-end',
  templateUrl: './workout-end.component.html',
  styleUrls: ['./workout-end.component.css']
})
export class WorkoutEndComponent implements OnInit {
  workout: any;
  workoutForm: FormGroup = new FormGroup({
    workoutTitle: new FormControl({value: '', disabled: true}),
    comment: new FormControl(),
    startDate: new FormControl(),
    startTime: new FormControl(),
    endDate: new FormControl(),
    endTime: new FormControl(),
    workout: new FormControl()
  });
  currentDate: String ;
  currentTime: String;
  id: any;
  startFlag: boolean;

  constructor(private route: ActivatedRoute, private ws: WorkoutService, private fb: FormBuilder, private datepipe: DatePipe, private router: Router) { 
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('ID');
    var date = Date.now();
    this.currentDate = this.datepipe.transform(date,'yyyy-MM-dd');
    this.currentTime = this.datepipe.transform(date,'HH:mm:ss');
    this.ws.getWorkoutByIndex(this.id).subscribe(workout => {
      this.workoutForm = this.fb.group({
        workoutTitle: [{value: workout.workoutTitle, disabled: true}],
        comment: [workout.workoutNote],
        startDate: [this.ws.getActiveWorkoutDetails().startDate],
        startTime: [this.ws.getActiveWorkoutDetails().startTime],
        endDate: [this.datepipe.transform(date,'yyyy-MM-dd'), Validators.required],
        endTime: [this.datepipe.transform(date,'HH:mm:ss'),Validators.required],
        workout: [workout],
      });
      this.workout = workout; 
    });
  }
  
  endWorkout(): void {
    this.ws.endWorkout(this.workoutForm.value).subscribe(workout => {
      this.ws.setStartFlag(workout.status);
      this.backToDashboard();
    });
  }

  backToDashboard(): void {
    this.router.navigate(["/dashboard",{title: this.id}]);
  }
}
