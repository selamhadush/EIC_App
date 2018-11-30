import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
  }

  login(userName: string, password: string): boolean {
    if (userName === 'user' && password === 'password') {
      localStorage.setItem('username', userName);
      return true;
    }
    return false;
  }

  logOut(): any {
    localStorage.removeItem('username');
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}