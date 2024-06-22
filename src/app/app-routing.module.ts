import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',  // Adjusted to direct to the customer tabs page
    pathMatch: 'full',
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./auth/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule
      ),
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./auth/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailPageModule
      ),
  },
  {
    path: 'whatsapp',
    loadChildren: () =>
      import('./auth/whatsapp/whatsapp.module').then(
        (m) => m.WhatsappPageModule
      ),
  },
  {
    path: 'otp',
    loadChildren: () =>
      import('./auth/otp/otp.module').then((m) => m.OtpPageModule),
  },
  {
    path: 'preference',
    loadChildren: () => import('./preference/preference.module').then( m => m.PreferencePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./seller/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'seller',
    loadChildren: () => import('./seller/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./customer/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./auth/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'choose',
    loadChildren: () => import('./choose/choose.module').then( m => m.ChoosePageModule)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./auth/new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./customer/tabs/home/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./customer/tabs/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./customer/tabs/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'order-datail',
    loadChildren: () => import('./customer/tabs/profile/order/order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },

  {
    path: '',
    loadChildren: () => import('./customer/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('./customer/tabs/home/product-detail/product-detail.module').then(m => m.ProductDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
