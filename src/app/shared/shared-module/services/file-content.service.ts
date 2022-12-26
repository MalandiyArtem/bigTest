import { Injectable } from '@angular/core';
import { FileEncodingType } from '../../interfaces/Records/file-encoding-type';

@Injectable({
  providedIn: 'root',
})
export class FileContentService {
  decodeContent(content: string, encodingType: string) : string {
    switch (encodingType) {
      case FileEncodingType.utf8:
        return content;
      case FileEncodingType.base64:
        content = content.replace('77u/', '');
        return decodeURIComponent(encodeURI(window.atob(content)));
      default:
        return content;
    }
  }

  myFunc() {
    console.log('Help');
  }
}
