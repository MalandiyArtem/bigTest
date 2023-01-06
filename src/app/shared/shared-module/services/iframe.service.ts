import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IframeService {
  constructor(private router: Router) {
  }


  simpleFunction() {
    console.log(12);
  }

  checkIsIframe(page: string) {
    this.router.navigate([page]);
  }
}
