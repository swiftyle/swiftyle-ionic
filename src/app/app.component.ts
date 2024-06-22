import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Keyboard } from '@ionic-native/keyboard/ngx';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  // ionViewDidEnter() {
  //   this.keyboard.onKeyboardWillShow().subscribe(() => {
  //     document.body.classList.add('keyboard-is-open');
  //   });

  //   this.keyboard.onKeyboardWillHide().subscribe(() => {
  //     document.body.classList.remove('keyboard-is-open');
  //   });
  // }
}
