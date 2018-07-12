import { Pipe, PipeTransform } from '@angular/core';
import { Category } from './category';

@Pipe({
  name: 'searchCategory'
})
export class SearchCategoryPipe implements PipeTransform {

  transform(items: Category[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.categoryName.toLowerCase().includes(searchText);
    });
   }

}
