import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccessValidationService {
  private token = 'token validation';

  hasAccess() {
    return this.token;
  }
}asassadasdasd
