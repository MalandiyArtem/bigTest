import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccessValidationService {
  private token = '12345678900987654321';

  hasAccess(token: string) {
    return this.token === token;
  }
}
