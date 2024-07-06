import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: 'edit-profile',
        loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderPageModule)
      },
      {
        path: 'profile-setting',
        loadChildren: () => import('./profile-setting/profile-setting.module').then(m => m.ProfileSettingPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('./history/history.module').then(m => m.HistoryPageModule)
      },
      {
        path: 'shipping-address',
        loadChildren: () => import('./shipping-address/shipping-address.module').then(m => m.ShippingAddressPageModule)
      },
      {
        path: 'voucher',
        loadChildren: () => import('./voucher/voucher.module').then(m => m.VoucherPageModule)
      },
      {
        path: 'to-receive',
        loadChildren: () => import('./to-receive/to-receive.module').then(m => m.ToReceivePageModule)
      },
      {
        path: '',
        redirectTo: 'to-receive',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'track',
    loadChildren: () => import('./track/track.module').then( m => m.TrackPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
