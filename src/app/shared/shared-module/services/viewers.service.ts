import { Injectable } from '@angular/core';
import { IViewerInfo } from '../../interfaces/viewerInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class ViewersService {

  // no Vievers

  getViewerListInfo(): IViewerInfo[] {
    return ['viewer_1', 'viewer_2', 'viewer_3', 'viewer_4', 'viewer_5', 'viewer_6', 'viewer_7'];
  }

  setViewerInfo(viewerInfo: string) {
    console.log(viewerInfo);
  }
}
