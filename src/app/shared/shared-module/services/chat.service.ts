import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IChatMessage } from '../../interfaces/chatMessage.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages: IChatMessage[] = [];
  intervalValue$ = new BehaviorSubject<number>(0);

  getMessages(): IChatMessage[] {
    return this.messages;
  }

  sendMessage(userName: string, text: string): void {
    this.messages.push({ userName, text, time: '12:22' });
  }

  generateInterval() {
    setInterval(() => {
      const valueFromInterval = this.intervalValue$.value;
      this.intervalValue$.next(valueFromInterval + 1);
    }, 1000);
  }
}
