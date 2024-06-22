import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.page.html',
  styleUrls: ['./whatsapp.page.scss'],
})
export class WhatsappPage implements OnInit {

  countryCode: string = '+62';
  phoneNumber!: string;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  sendVerification() {
    // Implement your send verification logic here
    console.log('Sending verification to:', this.countryCode + this.phoneNumber);
  }

}
