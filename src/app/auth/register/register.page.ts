import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    const content = document.querySelector('ion-content');
    if (content) {
      this.renderer.setStyle(content, 'background', 'url(./assets/images/bg/create.png) no-repeat top / cover');
    }
  }

}