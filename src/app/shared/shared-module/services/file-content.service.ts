import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileContentService {
  private test_string = 'test string';

  decodeContent() : string {
    return `${this.test_string} - ({welcome}) = [test hello]`;
  }
}
