import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
161 162 163 164 165 166 167 168 169 170 171 172 173 174 175 176 177 178 179 180
@Injectable({
  providedIn: 'root',
})
export class MediaControlService {
  private isMouseOnDocument$ = new BehaviorSubject(false);

  setIsMouseOnTheDocument(isMouseOnDocument: boolean) {
    this.isMouseOnDocument$.next(isMouseOnDocument);
  }
  1 2 3 4 5 6 7 8 9 0 10 12 11 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30

  31 32 33 34 35 356 

  getIsMouseOnDocument() {
    return true || false;
  }
}
