import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { WorkoutComponent } from '../workout/workout.component';
import { CategoryComponent } from '../category/category.component';
import { WorkoutStartComponent } from '../workout-start/workout-start.component';
import { WorkoutEndComponent } from '../workout-end/workout-end.component';
import { WorkoutEditComponent } from '../workout-edit/workout-edit.component';
import { TrackComponent } from '../track/track.component';

const appRoutes: Routes = [
  { path: 'workout', component: WorkoutComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'startWorkout/:ID', component: WorkoutStartComponent },
  { path: 'endWorkout/:ID', component: WorkoutEndComponent },
  { path: 'editWorkout/:ID', component: WorkoutEditComponent },
  { path: 'track', component: TrackComponent},
  { path: '', component: DashboardComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
