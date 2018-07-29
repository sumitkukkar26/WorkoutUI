import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from './category';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('CategoryService', () => {

  let service: CategoryService;
  let httpClient: HttpClient;
  let httpTestingController : HttpTestingController;
  let categoriesUrl = 'http://localhost:8090/category';
  let httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call getCategory", () => {
    const expectedCategories: Category[] = [
      {categoryId: 1, categoryName: "Walk"},
      {categoryId: 2, categoryName: "Yoga"}
    ];

    httpClient.get<any[]>(categoriesUrl+"/getCategories")
      .subscribe(categories => expect(categories).toEqual(expectedCategories));
    
    const req = httpTestingController.expectOne(categoriesUrl+"/getCategories");

    expect(req.request.method).toEqual('GET');
    req.flush(expectedCategories);
  });

  it("should call setCategory", () => {
    const expectedCategory: Category = {categoryId: 1, categoryName: "Walk"};

    httpClient.post<Category>(categoriesUrl+"/addCategory", expectedCategory, httpOptions)
      .subscribe(category => expect(category).toEqual(expectedCategory));
    
    const req = httpTestingController.expectOne(categoriesUrl+"/addCategory");

    expect(req.request.method).toEqual('POST');
    req.flush(expectedCategory);
  });

  it("should call deleteCategory", () => {
    const expectedCategory: Category = {categoryId: 1, categoryName: "Walk"};

    httpClient.post<Category>(categoriesUrl+"/deleteCategory", expectedCategory, httpOptions)
      .subscribe(category => expect(category).toEqual(expectedCategory));
    
    const req = httpTestingController.expectOne(categoriesUrl+"/deleteCategory");

    expect(req.request.method).toEqual('POST');
    req.flush(expectedCategory);
  });

  afterEach(()=> {
    httpTestingController.verify();
  });
});
