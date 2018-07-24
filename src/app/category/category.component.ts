import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  
  categories;
  category: Category;
  private editLabel: String;
  private index;
  query: String;
  
  constructor(private categoryService: CategoryService) { 
    this.categories = [];
    this.category = new Category();
    this.editLabel = "Edit";
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategory().subscribe(categories => {
      this.categories = categories;
      if(this.categories == null) {
        this.categories = new Array();
      }
    });
  }

  saveCategory(): void {
    this.categoryService.setCategory(this.category).subscribe(category => {this.categories.push(category)});
    this.category = new Category();
  }

  deleteCategory(cat: Category): void {
    this.categories = this.categories.filter(c => c !== cat);
    this.categoryService.deleteCategory(cat).subscribe();
  }

  editCategory(event, index: any, cat: Category): void {
    this.index = index;
    var buttonValue = event.srcElement.attributes.value;
    if(buttonValue.value === "Edit") {
      buttonValue.value = "Update";
      document.getElementById(index).contentEditable = "true";
      document.getElementById(index).focus();
    } else {
      buttonValue.value = "Edit";
      document.getElementById(index).contentEditable = "false";
      cat.categoryName = document.getElementById(index).textContent;
      this.categoryService.setCategory(cat).subscribe();
    }
  }
}
