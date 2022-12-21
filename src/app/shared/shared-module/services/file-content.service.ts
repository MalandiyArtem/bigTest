import { Injectable } from '@angular/core';
import { FileEncodingType } from '../../interfaces/Records/file-encoding-type';

@Injectable({
  providedIn: 'root',
})
export class FileContentService {
  decodeContent() : string {
    return 'Decoded code';
  }
}
