import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 170
@Injectable({
  providedIn: 'root',
})
export class IframeService {
  constructor(private router: Router) {
  }

  checkIsIframe(page: string) {
    this.router.navigate([page]);
  }
}

I frame service? 
