import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });
  });

  it('should be created', inject([HttpTestingController,CategoryService], (httpClient: HttpTestingController,service: CategoryService) => {
    expect(service).toBeTruthy();
  }));
});
