import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkoutService } from '../workout.service';
import { Category } from '../category';


@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  workoutForm: FormGroup;
  categories = new Array();
  workouts = [];

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private ws: WorkoutService) { 
    this.createForm();
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategory().subscribe(categories => this.categories = categories);
  }

  save(): void {
    this.ws.saveWorkout(this.workoutForm.value).subscribe(workout => {this.workouts.push(this.workoutForm.value)});
    this.workoutForm.reset();
  }

  get(title: String): void {
    this.ws.getWorkout().subscribe(workouts => this.workouts = workouts);
    if(this.workouts == null) {
      this.workouts = new Array();
    }
  }
  createForm(): void {
    this.workoutForm = this.fb.group({
      workoutTitle: ['', Validators.required],
      workoutNote: '',
      caloriesBurnPerMin: [0, Validators.required],
      category: [, Validators.required]
    })
  }

  checkCal(): boolean {
    var cal = this.workoutForm.get('caloriesBurnPerMin').value;
    if(cal!=null && cal!="" && cal > 0.1) {
      return false;
    }
    return true;
  }

  incrementValue(): void {
    let calories: number = this.workoutForm.get('caloriesBurnPerMin').value;
    calories = calories + .1;
    this.workoutForm.patchValue({
      cal: calories
    });
  }

  decrementValue(): void {
    let calories: number = this.workoutForm.get('caloriesBurnPerMin').value;
    calories = calories - 0.1;
    this.workoutForm.patchValue({
      cal: calories
    });
  }
}
