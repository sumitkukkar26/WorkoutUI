import { Pipe, PipeTransform } from '@angular/core';
import { WorkoutModel } from './workout-model';

@Pipe({
  name: 'searchWorkout'
})
export class SearchWorkoutPipe implements PipeTransform {


  public transform(items: WorkoutModel[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.workoutTitle.toLowerCase().includes(searchText);
    });
   }

}
