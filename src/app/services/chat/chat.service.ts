// src/app/services/chat/chat.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private apiService: ApiService) {}

  getChats(): Observable<any> {
    return this.apiService.getChats();
  }

  getChatById(chatId: string): Observable<any> {
    return this.apiService.getChatById(chatId);
  }

  createChat(chatData: any): Observable<any> {
    return this.apiService.createChat(chatData);
  }

  updateChat(chatData: any): Observable<any> {
    return this.apiService.updateChat(chatData);
  }

  deleteChat(chatId: string): Observable<any> {
    return this.apiService.deleteChat(chatId);
  }
}
