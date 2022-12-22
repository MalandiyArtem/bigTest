import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40
@Injectable({
  providedIn: 'root',
})
export class ActiveFileService {
  private activeFilePath$ = new BehaviorSubject('');

  // is unvaliable
}
