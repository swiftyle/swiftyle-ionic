import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostPopularPageRoutingModule } from './most-popular-routing.module';

import { MostPopularPage } from './most-popular.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostPopularPageRoutingModule
  ],
  declarations: [MostPopularPage]
})
export class MostPopularPageModule {}
