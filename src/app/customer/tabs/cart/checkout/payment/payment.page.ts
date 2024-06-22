import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage {
  bankDropdownOpen = false;
  walletDropdownOpen = false;

  toggleDropdown(type: string) {
    if (type === 'bank') {
      this.bankDropdownOpen = !this.bankDropdownOpen;
    } else if (type === 'wallet') {
      this.walletDropdownOpen = !this.walletDropdownOpen;
    }
  }
}
