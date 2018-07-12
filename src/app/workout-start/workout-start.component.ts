import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { WorkoutModel } from '../workout-model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WorkoutService } from '../workout.service';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-workout-start',
  templateUrl: './workout-start.component.html',
  styleUrls: ['./workout-start.component.css']
})
export class WorkoutStartComponent implements OnInit {
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
  id: any;
  startFlag = false;
  
  constructor(private route: ActivatedRoute, private ws: WorkoutService, private fb: FormBuilder, private datepipe: DatePipe, private router: Router) { 
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('ID');
    this.workout  = this.ws.getWorkoutByIndex(this.id);
    var date = Date.now();
    this.ws.getWorkoutByIndex(this.id).subscribe(workout => {
      this.workoutForm = this.fb.group({
        workoutTitle: [{value: workout.workoutTitle, disabled: true}],
        comment: [workout.workoutNote],
        startDate: [this.datepipe.transform(date,'yyyy-MM-dd'), Validators.required],
        startTime: [this.datepipe.transform(date,'HH:mm:ss'),Validators.required],
        workout: [workout],
      });
      this.workout = workout; 
    });
    this.ws.change.subscribe( startFlag => { this.startFlag = startFlag });
  }

  startWorkout(): void {
    this.ws.startWorkout(this.workoutForm.value).subscribe(workout => {
      this.ws.setStartFlag(workout.status);
      this.backToDashboard();
    });
  }

  backToDashboard(): void {
    this.router.navigate(["/dashboard",{index: this.id}]);
  }
}
