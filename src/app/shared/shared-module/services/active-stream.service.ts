import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { ReplaySubject } from 'rxjs';
import { StreamType } from '../../enums/stream-type';
41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60
@Injectable({
  providedIn: 'root',
})
export class ActiveStreamService {
  private streamId$ = new ReplaySubject(1);
  private streamType$ = new ReplaySubject(1);

  setStreamInfo(streamId: Guid, streamType: StreamType) {
    this.streamId$.next(streamId);
    this.streamType$.next(streamType);
  }

  getStreamId() {
    return this.streamId$.asObservable();
  }

  getStreamType() {
    return this.streamType$.asObservable();
  }
}
