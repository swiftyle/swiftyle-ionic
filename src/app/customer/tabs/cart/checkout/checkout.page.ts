import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { AddressService } from 'src/app/services/address/address.service';
import { UserService } from 'src/app/services/user/user.service';
import { CourierService } from 'src/app/services/courier/courier.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  @ViewChild('pageContent', { static: true }) pageContent!: IonContent;

  address: any = {};
  contact: { phone_number: string; email: string } = { phone_number: '', email: '' };
  cartItems: any[] = [];
  addresses: any[] = [];
  voucherApplied: boolean = false;
  selectedVoucher: any = null;
  total: number = 0;
  selectedShippingOption: any = 'Standard';
  deliveryDate: string = '';
  selectedCourierCost: number = 0;

  isShippingModalOpen: boolean = false;
  isContactModalOpen: boolean = false;
  isVoucherModalOpen: boolean = false;
  isShippingOptionsModalOpen: boolean = false;
  breakpoints: number[] = [0, 0.25, 0.5, 0.75, 1];
  initialBreakpoint: number = 0.25;

  vouchers: any = {};
  couriers: any[] = [];
  selectedCourierCategories: any[] = [];
  selectedCourierName: string = '';
  selectedCourierId: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private addressService: AddressService,
    private userService: UserService,
    private modalController: ModalController,
    private toastController: ToastController,
    private courierService: CourierService,
    private checkoutService: CheckoutService,
  ) {}

  ngOnInit() {
    this.loadCartItems();
    this.loadAddresses();
    this.loadContact();
    this.getAppCoupon();
    this.getCourier();
  }

  async loadCartItems() {
    try {
      this.cartItems = await this.cartService.loadCartItems();
      this.calculateTotal();
    } catch (error) {
      console.error('Failed to load cart items:', error);
      this.showToast('Failed to load cart items. Please try again later.', 'danger');
    }
  }

  async loadAddresses() {
    try {
      this.addresses = await this.addressService.loadAddresses();
      if (this.addresses.length > 0) {
        const address = this.addresses[0];
        this.address = address; // Simpan seluruh objek address
      }
    } catch (error) {
      console.error('Failed to load addresses:', error);
      this.showToast('Failed to load addresses. Please try again later.', 'danger');
    }
  }

  async loadContact() {
    try {
      const user = await this.userService.loadUser();
      this.contact.phone_number = user.phone_number;
      this.contact.email = user.email;
    } catch (error) {
      console.error('Failed to load contact info:', error);
      this.showToast('Failed to load contact info. Please try again later.', 'danger');
    }
  }

  async getAppCoupon() {
    try {
      const response = await this.cartService.getAppCoupon();
      if (response && response.data && response.data.length > 0) {
        this.vouchers = response.data;
        console.log('Vouchers Loaded:', this.vouchers);
      }
    } catch (error) {
      console.error('Failed to apply voucher:', error);
      this.showToast('Failed to apply voucher. Please try again later.', 'danger');
    }
  }

  getCourier() {
    this.courierService.getCourier().subscribe(
      (courier) => {
        this.couriers = courier.data;
        console.log('Courier Loaded:', courier);
      },
      (error) => {
        console.error('Failed to load courier:', error);
        this.showToast('Failed to load courier. Please try again later.', 'danger');
      }
    );
  }

  getUniqueCouriers() {
    const uniqueCourierMap = new Map();
    this.couriers.forEach(courier => {
      if (!uniqueCourierMap.has(courier.name)) {
        uniqueCourierMap.set(courier.name, courier);
      }
    });
    return Array.from(uniqueCourierMap.values());
  }

  selectCourier(name: string) {
    this.selectedCourierName = name;
    const selectedCourier = this.couriers.find(courier => courier.name === name);
    if (selectedCourier) {
      this.selectedCourierCost = parseFloat(selectedCourier.cost); // Ensure it's a number
      console.log('Selected Courier Cost:', this.selectedCourierCost);
    }
    this.selectedCourierCategories = this.couriers.filter(courier => courier.name === name);
    this.closeShippingOptionsModal();
    this.calculateTotal();
  }

  changeShipping(option: any) {
    this.selectedShippingOption = option;
    this.selectedCourierCost = parseFloat(option.category.courier_costs); // Ensure it's a number
    console.log('Selected Shipping Option Cost:', this.selectedCourierCost);
    this.calculateTotal();
  }

  calculateTotal() {
    let total = this.cartItems.reduce((total, item) => total + item.product.data.price * item.quantity, 0);
    console.log('Subtotal:', total);
    if (this.selectedVoucher) {
      if (this.selectedVoucher.type === 'percentage_discount') {
        total -= total * (this.selectedVoucher.discount_amount / 100);
      } else {
        total -= parseFloat(this.selectedVoucher.discount_amount);
      }
      console.log('Total after voucher:', total);
    }
    total += this.selectedCourierCost; // Add the selected courier cost
    console.log('Total after adding courier cost:', total);
    this.total = parseFloat(total.toFixed(2)); // Format the total to 2 decimal places
    console.log('Formatted Total:', this.total);
  }

  async updateCart(cartId: number, appCouponId: number) {
    try {
      await this.cartService.updateCart(cartId, appCouponId);
      this.showToast('Cart item quantity updated.', 'success');
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
      this.showToast(
        'Failed to update cart item quantity. Please try again later.',
        'danger'
      );
    }
  }

  getDaysLeft(endDate: string): number {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  openShippingModal() {
    this.isShippingModalOpen = true;
  }

  closeShippingModal() {
    this.isShippingModalOpen = false;
  }

  selectAddress(address: any) {
    this.address = address; // Simpan seluruh objek address
    this.closeShippingModal();
  }

  openContactModal() {
    this.isContactModalOpen = true;
  }

  closeContactModal() {
    this.isContactModalOpen = false;
  }

  saveContactChanges() {
    this.isContactModalOpen = false;
  }

  openVoucherModal() {
    this.isVoucherModalOpen = true;
  }

  closeVoucherModal() {
    this.isVoucherModalOpen = false;
  }

  openShippingOptionsModal() {
    this.isShippingOptionsModalOpen = true;
  }

  closeShippingOptionsModal() {
    this.isShippingOptionsModalOpen = false;
  }

  applyVoucher(voucher: any) {
    this.selectedVoucher = voucher;
    this.voucherApplied = true;
    this.closeVoucherModal();
    this.calculateTotal();
  }

  removeVoucher() {
    this.selectedVoucher = null;
    this.voucherApplied = false;
    this.calculateTotal();
  }

  async checkoutOrder() {
    console.log('Order confirmed');
    console.log('Shipping address:', this.address);
    console.log('Contact info:', this.contact);
    console.log('Total price:', this.total);

    if (!this.address.id) {
      this.showToast('Please select a valid address.', 'danger');
      return;
    }

    const cartId = this.cartItems.length > 0 ? this.cartItems[0].cartId : null;
    const appCouponId = this.selectedVoucher ? this.selectedVoucher.id : null;
    const addressId = this.address.id;
    const selectedCourier = this.couriers.find(
      courier => courier.name === this.selectedCourierName
    );
    const courierId = selectedCourier ? selectedCourier.id : null;

    if (!courierId) {
      this.showToast('Please select a valid courier.', 'danger');
      return;
    }

    console.log('Courier ID:', courierId);

    const checkoutData = {
      cart_id: cartId,
      address_id: addressId,
      courier_id: courierId,
    };

    try {
      await this.cartService.updateCart(cartId, appCouponId);
      this.checkoutService.checkout(checkoutData).subscribe(
        (response) => {
          console.log('Checkout successful', response);
          window.location.href = response.data.payment_url;
        },
        (error) => {
          console.error('Checkout failed', error);
          this.showToast('Checkout failed. Please try again later.', 'danger');
          if (error.error) {
            console.log('Error details:', error.error);
          }
        }
      );
    } catch (error) {
      console.error('Error in checkout process:', error);
      this.showToast('Failed to update cart. Please try again later.', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
    });
    toast.present();
  }
}
