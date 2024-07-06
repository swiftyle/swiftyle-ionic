import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToReceivePage } from './to-receive.page';

const routes: Routes = [
  {
    path: '',
    component: ToReceivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToReceivePageRoutingModule {}
