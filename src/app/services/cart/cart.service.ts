import { Inject, Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../storage/storage.service';
import { Strings } from '../../enum/strings.enum';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  model: any = null;
  total_delivery_charge = 10000;
  tax = 11; // in percentage
  cartStoreName = Strings.CART_STORAGE;
  currency = Strings.CURRENCY;

  private storage = inject(StorageService);
  private _cart = new BehaviorSubject<any>(null);

  get cart() {
    return this._cart.asObservable();
  }

  constructor(
    storage: StorageService,
    private alertController: AlertController
  ) {
    console.log('constructor cart service');
    this.storage = storage;
    this.getCart();
  }

  addQuantity(item: any) {
    if (this.model) {
      const index = this.model.items.findIndex(
        (data: any) => data.id === item.id
      );
      if (index >= 0) {
        this.model.items[index].quantity += 1;
      } else {
        const items = [{ ...item, quantity: 1 }];
        this.model.items = items.concat(this.model.items);
      }
    } else {
      this.model = {
        items: [{ ...item, quantity: 1 }],
      };
    }

    return this.calculate();
  }

  subtractQuantity(item: any) {
    if (this.model) {
      const index = this.model.items.findIndex(
        (data: any) => data.id === item.id
      );
      if (index >= 0) {
        if (this.model.items[index].quantity > 0) {
          this.model.items[index].quantity -= 1;
          if (this.model.items[index].quantity === 0) {
            this.presentConfirmation(item);
          } else {
            return this.calculate();
          }
        }
      }
    }
    return null;
  }

  async presentConfirmation(item: any) {
    const alert = await this.alertController.create({
      header: 'Delete Item?',
      message: 'Are you sure you want to delete this item from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            const index = this.model.items.findIndex(
              (data: any) => data.id === item.id
            );
            if (index >= 0) {
              this.model.items[index].quantity = 1;
              this.calculate();
            }
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.removeItem(item);
          },
        },
      ],
    });

    await alert.present();
  }

  calculate() {
    const items = this.model.items.filter((item: any) => item.quantity > 0);

    if (items?.length == 0) {
      return;
    }

    let totalItem = 0;
    let totalPrice = 0;

    for (const element of items) {
      totalItem += element.quantity;
      totalPrice += element.quantity * element.price;
    }

    const tax = totalPrice * (this.tax / 100);

    const grandTotal = totalPrice + this.total_delivery_charge + tax;

    this.model = {
      ...this.model,
      totalItem,
      totalPrice,
      total_delivery_charge: this.total_delivery_charge,
      tax,
      grandTotal,
    };

    this._cart.next(this.model);
    this.saveCart(this.model);

    console.log(this.model);

    return this.model;
  }

  saveCart(data: any) {
    const model = JSON.stringify(data);
    this.storage.setStorage(this.cartStoreName, model);
  }

  async clearCart() {
    const alert = await this.alertController.create({
      header: 'Delete All Items?',
      message: 'Are you sure you want to delete all items from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.storage.removeStorage(this.cartStoreName);
            this.model = null;
            this._cart.next(null);
          },
        },
      ],
    });

    await alert.present();
  }

  async getCart() {
    let data: any = this._cart.value;

    if (!data) {
      data = await this.storage.getStorage(this.cartStoreName);
      console.log(data);
      if (data?.value) {
        this.model = JSON.parse(data.value);
        this._cart.next(this.model);
      }
    }
    console.log('get cart', this.model);

    return this.model;
  }

  removeItem(item: any) {
    if (this.model) {
      this.model.items = this.model.items.filter(
        (data: any) => data.id !== item.id
      );
      this.calculate();
    }
    if (this.model && this.model.items.length === 0) {
      // Jika tidak ada item lagi, hapus storage
      this.storage.removeStorage(this.cartStoreName);
      this.model = null;
      this._cart.next(null);
    }
  }
}
