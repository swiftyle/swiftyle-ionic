import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  searchTerm: string = '';
  chats = [
    {
      name: 'Isekai.shop',
      message: 'Temukan produk special di toko kami',
      avatar: 'assets/img/avatar1.png',
      unreadCount: 2
    },
    {
      name: 'Cecep.Shoes',
      message: 'Voucher 6.6 sudah menunggumu!',
      avatar: 'assets/img/avatar2.png',
      unreadCount: 1
    }
  ];

  get filteredChats() {
    return this.chats.filter(chat => chat.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  constructor() {}

  ngOnInit() {}
}
