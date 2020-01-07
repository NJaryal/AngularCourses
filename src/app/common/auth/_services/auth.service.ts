import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    constructor() { }

    login(username: string, password: string) {
      return localStorage.setItem('currentUser', JSON.stringify(`${username} + ${password}`));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}
