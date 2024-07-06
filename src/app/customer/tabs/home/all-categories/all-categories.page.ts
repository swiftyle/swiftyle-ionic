import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.page.html',
  styleUrls: ['./all-categories.page.scss'],
})
export class AllCategoriesPage implements OnInit {
  selectedCategory: string = 'female'; // default selected category
  isContentVisible: { [key: string]: boolean } = {};

  constructor() { }

  ngOnInit() {
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  toggleContent(category: string) {
    this.isContentVisible[category] = !this.isContentVisible[category];
  }
}
