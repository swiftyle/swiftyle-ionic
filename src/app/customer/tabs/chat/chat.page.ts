// src/app/customer/tabs/chat/chat.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat/chat.service';
import { DataRefreshService } from 'src/app/services/data-refresh/data-refresh.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  searchTerm: string = '';
  chats: any[] = [];
  constructor(
    private router: Router,
    private chatService: ChatService,
    private dataRefreshService: DataRefreshService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.loadChats();
  }

  handleRefresh(event: any): void {
    this.dataRefreshService.handleRefresh(event);
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/tabs/home']);
    });
  }

  loadChats() {
    this.chatService.getChats().subscribe(
      (chats: any) => {
        this.chats = chats;
      },
      (error: any) => {
        console.error('Failed to load chats', error);
      }
    );
  }

  get filteredChats() {
    return this.chats.filter((chat) =>
      chat.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openMessage(chat: { name: string; avatar: string }) {
    this.router.navigate(['/message', chat.name, { avatar: chat.avatar }]);
  }
}
