import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToReceivePageRoutingModule } from './to-receive-routing.module';

import { ToReceivePage } from './to-receive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToReceivePageRoutingModule
  ],
  declarations: [ToReceivePage]
})
export class ToReceivePageModule {}
