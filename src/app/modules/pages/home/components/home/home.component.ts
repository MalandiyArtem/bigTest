import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line import/no-unresolved
import { ChatService } from 'src/app/shared/shared-module/services/chat.service';

interface ValueFromChat {
  chatValue: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  hasAccess = false;
  intervalValue_2 = 0;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.hasAccess = true;

    this.chatService.generateInterval_2();

    this.chatService.intervalValue_2$.subscribe((value: number) => {
      this.intervalValue_2 = value;
    });
  }
}
