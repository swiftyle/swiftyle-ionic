import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

// Import ProductDetailPageModule
import { ProductDetailPageModule } from './product-detail/product-detail.module';

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
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'all-categories',
    loadChildren: () => import('./all-categories/all-categories.module').then(m => m.AllCategoriesPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
