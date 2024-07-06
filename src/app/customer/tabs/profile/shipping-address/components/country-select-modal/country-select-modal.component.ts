import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-country-select-modal',
  templateUrl: './country-select-modal.component.html',
  styleUrls: ['./country-select-modal.component.scss'],
})
export class CountrySelectModalComponent {
  @Input() selectedCountry: string = ''; // Inisialisasi selectedCountry

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Memastikan selectedCountry diatur saat modal dibuka
    console.log('Selected country on init:', this.selectedCountry);
  }

  selectCountry(country: string) {
    this.selectedCountry = country;
    this.dismiss(); // Panggil dismiss setelah memilih negara
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'selectedCountry': this.selectedCountry
    });
  }
}
