import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutEditComponent } from './workout-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { CategoryComponent } from '../category/category.component';
import { SearchCategoryPipe } from '../search-category.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('WorkoutEditComponent', () => {
  let component: WorkoutEditComponent;
  let fixture: ComponentFixture<WorkoutEditComponent>;
  const router = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports:[FormsModule, HttpClientModule, ReactiveFormsModule, RouterTestingModule],
    declarations: [ WorkoutEditComponent, CategoryComponent, SearchCategoryPipe],
    providers: [WorkoutService, CategoryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

