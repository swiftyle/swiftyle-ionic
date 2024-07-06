import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

// Import ProductDetailPageModule
import { ProductDetailPageModule } from './product-detail/product-detail.module';
import { NotificationPageModule } from './notification/notification.module';
import { AllCategoriesPageModule } from './all-categories/all-categories.module';
import { SearchPageModule } from './search/search.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
 
  {
    path: 'product-detail/:id',
    loadChildren: () => ProductDetailPageModule // Load ProductDetailPageModule
  },
  {
    path: 'notification',
    loadChildren: () => NotificationPageModule
  },
  {
    path: 'all-categories',
    loadChildren: () => AllCategoriesPageModule
  },
  {
    path: 'search',
    loadChildren: () => SearchPageModule
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
