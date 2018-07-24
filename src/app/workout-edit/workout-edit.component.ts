import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { WorkoutModel } from '../workout-model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WorkoutService } from '../workout.service';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.css']
})
export class WorkoutEditComponent implements OnInit {
  workout: WorkoutModel = new WorkoutModel();
  origWorkout: any;
  workoutForm: FormGroup = new FormGroup({
    workoutTitle: new FormControl(),
    workoutNote: new FormControl(),
    caloriesBurnPerMin: new FormControl(),
    category: new FormControl()
  });
  id: any;
  categories = [];
  
  constructor(private route: ActivatedRoute, private cs: CategoryService, private ws: WorkoutService, private fb: FormBuilder, private router: Router) { 
  }

  ngOnInit() {
    this.getCategories();
    this.id = this.route.snapshot.paramMap.get('ID');
    this.ws.getWorkoutByIndex(this.id).subscribe(workout => {
      this.workoutForm = this.fb.group({
        workoutTitle: [workout.workoutTitle, Validators.required],
        workoutNote: [workout.workoutNote],
        caloriesBurnPerMin: [workout.caloriesBurnPerMin],
        category: [workout.category, Validators.required],
        workoutId: [workout.workoutId]
      });
      this.workout = workout; 
    });
    this.origWorkout = this.workout; 
  }

  getCategories(): void {
    this.cs.getCategory().subscribe(categories => this.categories = categories);
  }

  editWorkout(): void {
    this.ws.saveWorkout(this.workoutForm.value).subscribe();
    this.workoutForm.reset();
    this.backToDashboard();
  }

  backToDashboard(): void {
    this.router.navigate(["/dashboard",{index: this.id}]);
  }
}
