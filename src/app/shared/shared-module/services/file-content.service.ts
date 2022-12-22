import { Injectable } from '@angular/core';
101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120
@Injectable({
  providedIn: 'root',
})
export class FileContentService {
  private test_string = 'test string';

  decodeContent() : string {
    return `${this.test_string} - ({welcome}) = [test hello]`;
  }
}
