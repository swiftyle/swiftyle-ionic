import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./chat/chat.module').then((m) => m.ChatPageModule),
      },
      {
        path: 'wishlist',
        loadChildren: () =>
          import('./wishlist/wishlist.module').then(
            (m) => m.WishlistPageModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./cart/cart.module').then(
            (m) => m.CartPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
