import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailPage } from './product-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailPage
  },  {
    path: 'review',
    loadChildren: () => import('./components/review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'profile-seller',
    loadChildren: () => import('./profile-seller/profile-seller.module').then( m => m.ProfileSellerPageModule)
  },
  {
    path: 'product-modal',
    loadChildren: () => import('./product-modal/product-modal.module').then( m => m.ProductModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailPageRoutingModule {}
