import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { CategoryComponent } from './category.component';
import { SearchCategoryPipe } from '../search-category.pipe';
import { CategoryService } from '../category.service';
import { HttpClientModule } from '@angular/common/http';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports:[FormsModule, HttpClientModule],
    declarations: [ CategoryComponent, SearchCategoryPipe ],
    providers: [CategoryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
