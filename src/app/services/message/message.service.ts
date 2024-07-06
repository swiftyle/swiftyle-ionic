// src/app/services/message/message.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private apiService: ApiService) {}

  getMessages(chatId: string): Observable<any> {
    return this.apiService.getMessages(chatId);
  }

  getMessageById(chatId: string, messageId: string): Observable<any> {
    return this.apiService.getMessageById(chatId, messageId);
  }

  async createMessage(chatId: string, messageData: any): Promise<void> {
    try {
      const response: any = await this.apiService
        .createMessage(chatId, messageData)
        .toPromise();
      console.log('Message created:', response.data);
    } catch (error) {
      console.error('Error creating message:', error);
    }
  }

  async updateMessage(chatId: string, messageData: any): Promise<void> {
    try {
      const response: any = await this.apiService
        .updateMessage(chatId, messageData)
        .toPromise();
      console.log('Message updated:', response.data);
    } catch (error) {
      console.error('Error updating message:', error);
    }
  }

  async deleteMessage(chatId: string, messageId: string): Promise<void> {
    try {
      await this.apiService.deleteMessage(chatId, messageId).toPromise();
      console.log('Message deleted:', messageId);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }
}
