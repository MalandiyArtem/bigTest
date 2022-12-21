import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IChatMessage } from '../../interfaces/chatMessage.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages: IChatMessage[] = [];

  intervalValue_5$ = new BehaviorSubject(0);

  getMessages(): IChatMessage[] {
    return this.messages;
  }

  sendMessage(userName: string, text: string): void {
    this.messages.push({ userName, text, time: '12:22' });
  }

  generateInterval_5() {
    setInterval(() => {
      const valueFromInterval = this.intervalValue_5$.value;
      this.intervalValue_5$.next(valueFromInterval + 1);
    });
  }
}
