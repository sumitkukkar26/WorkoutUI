import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutComponent } from './workout.component';
import { WorkoutService } from '../workout.service';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryComponent } from '../category/category.component';
import { SearchCategoryPipe } from '../search-category.pipe';
import { CategoryService } from '../category.service';

describe('WorkoutComponent', () => {
  let component: WorkoutComponent;
  let fixture: ComponentFixture<WorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule, HttpClientModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ WorkoutComponent, CategoryComponent, SearchCategoryPipe],
      providers: [WorkoutService, DatePipe, CategoryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
