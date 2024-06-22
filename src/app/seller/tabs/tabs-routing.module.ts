import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/shop',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'shop',
        loadChildren: () =>
          import('./shop/shop.module').then((m) => m.ShopPageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule)
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
