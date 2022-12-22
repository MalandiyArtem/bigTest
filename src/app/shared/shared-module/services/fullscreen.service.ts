import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140
@Injectable({
  providedIn: 'root',
})
export class FullscreenService {
  private isFullScreen = new BehaviorSubject(false);

  setIsFullScreen(state: boolean) {
    this.isFullScreen.next(state);
  }

  getIsFullScreen() {
    return this.isFullScreen as Observable<boolean>;
  }
}
