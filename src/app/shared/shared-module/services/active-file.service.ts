import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveFileService {
  private activeFilePath$ = new BehaviorSubject('');

  // is unvaliable
}
