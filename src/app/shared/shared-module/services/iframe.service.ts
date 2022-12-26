import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IframeService {
  constructor(private router: Router) {
  }

  checkIsIframe(page: string) {
    if (window === window.top) {
      this.router.navigate(['/not-found']);
    } else {
      this.router.navigate([page]);
    }
  }
}
