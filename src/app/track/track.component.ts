import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { WorkoutService } from '../workout.service';
import { WorkoutDetails } from '../workout-details';
import { CompileMetadataResolver } from '@angular/compiler';
import { TrackWorkout } from '../track-workout';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
    weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    workoutDetails: WorkoutDetails [];
    trackWorkout: TrackWorkout [] = [];
    workouts = [];
    weeklyGraphData = [];
    weeklyGraphLabels = [];
    monthlyGraphLabels = ["Week 1","Week 2","Week 3","Week 4","Week 5"];
    monthlyGraphData = [0,0,0,0,0];
    yearlyGraphLabels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    yearlyGraphData = [0,0,0,0,0,0,0,0,0,0,0,0];
    dayWorkoutDuration = 0;
    weeklyWorkoutDuration = 0;
    monthlyWorkoutDuration = 0;
    weekTotalCalories = 0;
    monthTotalCalories = 0;
    yearTotalCalories = 0;
    weeklyChart : Chart;
    monthlyChart : Chart;
    yearlyChart : Chart;

  constructor(private ws: WorkoutService, private datepipe: DatePipe) { }

  ngOnInit() {
    this.ws.getWorkout().subscribe(workouts => {
        this.workouts = workouts;
        this.ws.getWorkoutDetails().subscribe(workoutDetails => {
            this.workoutDetails = workoutDetails;
            this.calculateWorkoutDetails();
            this.createWeeklyGraph();
            this.createMonthlyGraph();
            this.createYearlyGraph();
            this.drawCharts();
        });
    });
  }

  createWeeklyGraph(): void {
    var lastWorkoutDate: Date = new Date(this.trackWorkout[this.trackWorkout.length-1].date+"T00:00:00");
    this.dayWorkoutDuration = this.trackWorkout[this.trackWorkout.length-1].duration;
    for(let i=6;i>=0;i--) {
        var localDate = this.datepipe.transform(lastWorkoutDate,'yyyy-MM-dd');
        this.weeklyGraphLabels[i] = this.weekDays[lastWorkoutDate.getDay()];
        var wo1 = this.trackWorkout.find(wo => wo.date.toString() == localDate);
        if(wo1 != null) {
            this.weeklyGraphData[i] = wo1.caloriesBurnt;
            this.weeklyWorkoutDuration += wo1.duration;
            this.weekTotalCalories += wo1.caloriesBurnt;
        } else {
            this.weeklyGraphData[i] = 0;
        }
        lastWorkoutDate.setTime(lastWorkoutDate.getTime() - 86400000);
    }
  }

  createMonthlyGraph(): void {
    var lastWorkoutDate: Date = new Date(this.trackWorkout[this.trackWorkout.length-1].date+"T00:00:00");
    var days = lastWorkoutDate.getDate();
    var numOfWeeks = Math.ceil(lastWorkoutDate.getDate()/7)-1;
    var weeklyData = 0;
    for(let i=days;i>0;i--) {
        var localDate = this.datepipe.transform(lastWorkoutDate,'yyyy-MM-dd');
        var wo1 = this.trackWorkout.find(wo => wo.date.toString() == localDate);
        if(wo1 != null) {
            weeklyData += wo1.caloriesBurnt;
            this.monthlyWorkoutDuration += wo1.duration;
            this.monthTotalCalories += wo1.caloriesBurnt;
        }
        if(i%7==0) {
            this.monthlyGraphData[numOfWeeks] = weeklyData;
            weeklyData = 0;
            numOfWeeks--;
        } else if(i<7) {
            this.monthlyGraphData[numOfWeeks] = weeklyData;
        }
        lastWorkoutDate.setTime(lastWorkoutDate.getTime() - 86400000);   
    }
  }

  createYearlyGraph(): void {
    var workoutDate: Date = new Date(this.trackWorkout[0].date+"T00:00:00");
    var month = workoutDate.getMonth();
    var monthlyData = 0;
    for(let i=0;i<this.trackWorkout.length;i++) {
        workoutDate = new Date(this.trackWorkout[i].date+"T00:00:00");
        if(month != workoutDate.getMonth()) {
            month = workoutDate.getMonth()
        }
        this.yearlyGraphData[month] += this.trackWorkout[i].caloriesBurnt;
        this.yearTotalCalories += this.trackWorkout[i].caloriesBurnt;
    }
  }

  calculateWorkoutDetails(): void {
    if(this.workoutDetails != null) {
    for(let wo of this.workoutDetails) {
        var calories = 0;
        var notFound = true;
        var start = new Date(wo.startDate);
        var end = new Date(wo.endDate);
        var duration = (end.valueOf() - start.valueOf())*1440;
        start = new Date(wo.startDate+"T"+wo.startTime);
        end = new Date(wo.endDate+"T"+wo.endTime);
        duration = duration + Math.round((end.valueOf() - start.valueOf())/60000);
        for(let wo1 of this.workouts) {
            if(wo.workout.workoutId == wo1.workoutId) {
                calories = duration * wo1.caloriesBurnPerMin;
            }
        }
        var track = new TrackWorkout();
        track.date = wo.startDate;
        track.duration = duration;
        track.caloriesBurnt = calories;
        for(let element of this.trackWorkout) {
            if(element.date == track.date) {
                element.duration += track.duration;
                element.caloriesBurnt += track.caloriesBurnt;
                notFound = false;
            }
        }
        if(this.trackWorkout.length == 0 || notFound) {
            this.trackWorkout.push(track);
        }
    }
    this.trackWorkout = this.trackWorkout.sort((n1,n2) => {
        if(n1.date > n2.date) {
            return 1;
        }
        if(n1.date < n2.date) {
            return -1;
        }
        return 0;
    });
    }
  }

  drawCharts(): void {
    this.weeklyChart = new Chart({
        chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      xAxis: {
          categories: this.weeklyGraphLabels
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Calories'
          }
      },
      series: [{
          name: 'Week Days',
          data: this.weeklyGraphData
      }]
      });
    
    this.monthlyChart = new Chart({
        chart: {
          type: 'column',
      },
      title: {
          text: ''
      },
      xAxis: {
          categories: this.monthlyGraphLabels
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Calories'
          }
      },
      series: [{
          name: 'Weeks',
          data: this.monthlyGraphData
      }]
      });
    
    this.yearlyChart = new Chart({
        chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      xAxis: {
          categories: this.yearlyGraphLabels
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Calories'
          }
      },
      series: [{
          name: 'Months',
          data: this.yearlyGraphData
      }]
      });
}
}
