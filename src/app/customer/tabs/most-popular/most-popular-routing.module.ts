import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostPopularPage } from './most-popular.page';

const routes: Routes = [
  {
    path: '',
    component: MostPopularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostPopularPageRoutingModule {}
