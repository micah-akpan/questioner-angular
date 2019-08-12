import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  storage = localStorage;
  tokenKey = 'authToken';

  constructor() {}

  saveToken(token) {
    this.storage.setItem(this.tokenKey, token);
  }

  deleteToken() {
    this.storage.removeItem(this.tokenKey);
  }

  get token() {
    return this.storage.getItem(this.tokenKey);
  }
}
