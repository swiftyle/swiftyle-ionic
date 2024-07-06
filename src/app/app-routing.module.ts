import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  // Public Routes
  {
    path: 'start',
    loadChildren: () =>
      import('./start/start.module').then((m) => m.StartPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./auth/reset-password/reset-password.module').then((m) => m.ResetPasswordPageModule),
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./auth/verify-email/verify-email.module').then((m) => m.VerifyEmailPageModule),
  },
  {
    path: 'whatsapp',
    loadChildren: () =>
      import('./auth/whatsapp/whatsapp.module').then((m) => m.WhatsappPageModule),
  },
  {
    path: 'otp',
    loadChildren: () =>
      import('./auth/otp/otp.module').then((m) => m.OtpPageModule),
  },
  {
    path: 'password',
    loadChildren: () =>
      import('./auth/password/password.module').then((m) => m.PasswordPageModule),
  },
  {
    path: 'choose',
    loadChildren: () =>
      import('./choose/choose.module').then((m) => m.ChoosePageModule),
  },
  {
    path: 'new-password',
    loadChildren: () =>
      import('./auth/new-password/new-password.module').then((m) => m.NewPasswordPageModule),
  },
  // Authenticated Routes
  {
    path: 'preference',
    loadChildren: () =>
      import('./preference/preference.module').then((m) => m.PreferencePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./customer/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./customer/tabs/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./customer/tabs/home/notification/notification.module').then((m) => m.NotificationPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./customer/tabs/profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile-setting',
    loadChildren: () =>
      import('./customer/tabs/profile/profile-setting/profile-setting.module').then((m) => m.ProfileSettingPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./customer/tabs/profile/edit-profile/edit-profile.module').then((m) => m.EditProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'voucher',
    loadChildren: () =>
      import('./customer/tabs/profile/voucher/voucher.module').then((m) => m.VoucherPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./customer/tabs/profile/history/history.module').then((m) => m.HistoryPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'shipping-address',
    loadChildren: () =>
      import('./customer/tabs/profile/shipping-address/shipping-address.module').then((m) => m.ShippingAddressPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'order-detail',
    loadChildren: () =>
      import('./customer/tabs/profile/order/order-detail/order-detail.module').then((m) => m.OrderDetailPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./customer/tabs/profile/order/order.module').then((m) => m.OrderPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'product-detail/:id',
    loadChildren: () =>
      import('./customer/tabs/home/product-detail/product-detail.module').then((m) => m.ProductDetailPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'message/:name',
    loadChildren: () =>
      import('./customer/tabs/chat/message/message.module').then((m) => m.MessagePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'all-categories',
    loadChildren: () =>
      import('./customer/tabs/home/all-categories/all-categories.module').then((m) => m.AllCategoriesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./customer/tabs/home/search/search.module').then((m) => m.SearchPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'to-receive',
    loadChildren: () =>
      import('./customer/tabs/profile/to-receive/to-receive.module').then((m) => m.ToReceivePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'track',
    loadChildren: () =>
      import('./customer/tabs/profile/track/track.module').then((m) => m.TrackPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('./seller/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'refund',
    loadChildren: () =>
      import('./customer/tabs/profile/order/refund/refund.module').then((m) => m.RefundPageModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
