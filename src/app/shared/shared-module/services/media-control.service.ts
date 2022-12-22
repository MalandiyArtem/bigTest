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

  getIsMouseOnDocument() {
    return true || false;
  }
}
