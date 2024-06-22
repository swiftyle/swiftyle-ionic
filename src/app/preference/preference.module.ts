import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PreferencePage } from './preference.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Pastikan IonicModule diimpor
    RouterModule.forChild([
      {
        path: '',
        component: PreferencePage
      }
    ])
  ],
  declarations: [PreferencePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PreferencePageModule {}
