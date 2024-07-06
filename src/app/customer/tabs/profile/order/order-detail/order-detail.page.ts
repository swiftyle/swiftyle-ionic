import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, ToastController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AddressService } from 'src/app/services/address/address.service';
import { UserService } from 'src/app/services/user/user.service';
import { CourierService } from 'src/app/services/courier/courier.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  @ViewChild('pageContent', { static: true }) pageContent!: IonContent;

  couriers: any[] = [];
  orderId: string = '';
  order: any = null;
  address: any = {};
  contact: { phone_number: string; email: string } = { phone_number: '', email: '' };
  orderItems: any[] = [];
  shippingOption: string = '';
  courier: any = null; // Menyimpan data courier
  total: number = 0;
  orderStatus: string = '';

  isShippingModalOpen: boolean = false;
  isContactModalOpen: boolean = false;
  breakpoints: number[] = [0, 0.25, 0.5, 0.75, 1];
  initialBreakpoint: number = 0.25;
  addresses: any[] = [];

  constructor(
    private orderService: OrderService,
    private modalController: ModalController,
    private toastController: ToastController,
    private addressService: AddressService,
    private userService: UserService,
    private router: Router,
    private storage: Storage,
    private courierService: CourierService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.orderId = await this.storage.get('selectedOrderId') || '';
    await this.loadOrderDetail();
    this.loadAddresses();
    this.loadContact();
    this.getCourier();
  }

  ionViewWillLeave() {
    // Hapus orderId dari Ionic Storage saat halaman akan meninggalkan tampilan
    this.storage.remove('selectedOrderId');
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
  
  async loadOrderDetail() {
    try {
      const orders = await this.orderService.getOrders();
      if (orders && Array.isArray(orders)) {
        this.order = orders.find(order => order.id === this.orderId);
        if (!this.order) {
          console.error('Order not found');
          this.showToast('Order not found', 'danger');
        } else {
          this.address = this.order.address;
          this.contact = {
            phone_number: this.order.contact?.phone_number || '',
            email: this.order.contact?.email || ''
          };
          this.orderItems = this.order.checkout?.products || [];
          this.courier = this.order.checkout?.courier || {}; // Load courier dari checkout.courier
          console.log(this.courier); // Tambahkan console log untuk cek struktur data
          this.total = this.order.checkout?.total_amount || 0;
          this.orderStatus = this.order.status || '';
        }
      } else {
        console.error('Unexpected response format:', orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      this.showToast('Failed to fetch orders', 'danger');
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

  openShippingModal() {
    this.isShippingModalOpen = true;
  }

  closeShippingModal() {
    this.isShippingModalOpen = false;
  }

  selectAddress(address: any) {
    this.address = address;
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

  orderRefund() {
    this.router.navigate(['refund']);
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
