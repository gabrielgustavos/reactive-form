import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  private admin = false;

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  setAuthenticated(value: boolean): void {
    this.authenticated = value;
  }

  isAdmin(): boolean {
    return this.admin;
  }

  setAdmin(value: boolean): void {
    this.admin = value;
  }
}
