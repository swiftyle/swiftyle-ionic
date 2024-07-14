import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { PreferencePageModule } from './preference/preference.module';
import { ProductModalPageModule } from './customer/tabs/home/product-detail/product-modal/product-modal.module'; // Adjust the path if needed
import { CountrySelectModalComponent } from './customer/tabs/profile/shipping-address/components/country-select-modal/country-select-modal.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth/interceptor.service';
import { RefreshDirective } from './directives/refresh.directive';
import { DataRefreshService } from './services/data-refresh/data-refresh.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    CountrySelectModalComponent,
    RefreshDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PreferencePageModule,
    ProductModalPageModule,
    HttpClientModule,
    IonicStorageModule.forRoot(), // Add IonicStorageModule here
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    DataRefreshService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
