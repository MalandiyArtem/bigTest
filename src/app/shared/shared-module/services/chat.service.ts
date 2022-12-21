import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IChatMessage } from '../../interfaces/chatMessage.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages: IChatMessage[] = [];

  intervalValue_2$ = new BehaviorSubject<number>(0);

  getMessages(): IChatMessage[] {
    return this.messages;
  }

  sendMessage(userName: string, text: string): void {
    this.messages.push({ userName, text, time: '12:22' });
  }

  generateInterval_2 () {
    setInterval(() => {
      const valueFromInterval = this.intervalValue_2$.value;
      this.intervalValue_2$.next(valueFromInterval + 1);
    });
  }
}
