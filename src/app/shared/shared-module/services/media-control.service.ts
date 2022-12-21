import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaControlService {
  private isMouseOnDocument$ = new BehaviorSubject(false);

  setIsMouseOnTheDocument(isMouseOnDocument: boolean) {
    this.isMouseOnDocument$.next(isMouseOnDocument);
  }

  getIsMouseOnDocument() {
    return true || false;
  }
}
