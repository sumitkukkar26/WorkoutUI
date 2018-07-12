import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ChartModule } from 'angular-highcharts';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkoutComponent } from './workout/workout.component';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from './category.service';
import { SearchCategoryPipe } from './search-category.pipe';
import { WorkoutService } from './workout.service';
import { SearchWorkoutPipe } from './search-workout.pipe';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { WorkoutStartComponent } from './workout-start/workout-start.component';
import { WorkoutEndComponent } from './workout-end/workout-end.component';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';
import { TrackComponent } from './track/track.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WorkoutComponent,
    CategoryComponent,
    SearchCategoryPipe,
    SearchWorkoutPipe,
    WorkoutStartComponent,
    WorkoutEndComponent,
    WorkoutEditComponent,
    TrackComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartModule,
    HttpClientModule
  ],
  providers: [CategoryService,WorkoutService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
