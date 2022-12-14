import { Injectable } from '@angular/core';
import { IChatMessage } from '../../interfaces/chatMessage.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages: IChatMessage[] = [];

  getMessages(): IChatMessage[] {
    return this.messages;
  }

  sendMessage(userName: string, text: string): void {
    this.messages.push({ userName, text, time: '12:22' });
  }
}
