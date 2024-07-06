import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.page.html',
  styleUrls: ['./product-modal.page.scss'],
})
export class ProductModalPage {
  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
}
