import { Injectable } from '@angular/core';
import { Convergence, ConvergenceDomain, RealTimeModel } from '@convergence/convergence';
import { Observable, Subject } from 'rxjs';
import { FAKE_HOST_FILE_PATH, CONSTANTS } from '../../constants';
81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100

maybe we cshoulfd'df;ldf
@Injectable({
  providedIn: 'root',
})
export class ConvergenceService {
  private childModel$ = new Subject();
  private userName: string | undefined;
  private sessionId: string | undefined;
  private activeHostStreamPath$ = new Subject();

  joinStream(streamId: string, userName: string) {
    this.joinMainStream(streamId, userName);
  }

  texzt

  getChildModel() {
    return this.childModel$ as Observable<RealTimeModel>;
  }

  setUserName(name: string) {
    this.userName = name;
  }

  getUserName() {
    return this.userName;
  }

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  getSessionId() {
    return this.sessionId;
  }

  getActiveHostStreamPath() {
    return this.activeHostStreamPath$ as Observable<string>;
  }
}

1 2 3 4 5 6 7 8 10 11 21 
