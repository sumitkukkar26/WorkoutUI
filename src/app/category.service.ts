import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable()
export class CategoryService {

  private categoriesUrl = 'http://localhost:8090/category';  // URL to web api
  private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
  constructor(private http: HttpClient) {
  }

  public setCategory(cat: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl+"/addCategory", cat, this.httpOptions);
  }

  public getCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.categoriesUrl+"/getCategories");
  }

  public deleteCategory(cat: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl+"/deleteCategory", cat, this.httpOptions);
  }
}
