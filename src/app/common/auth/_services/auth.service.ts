import { LoaderService } from './../../services/loader.service';
import { Observable, of, Subject } from 'rxjs';
import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  testuser: User = {
    firstname: 'Nitin',
    lastname: 'Jaryal',
    username: 'njaryal',
    password: '12345',
    id: '34589798vfjkdfgjkljdslk09431234',
    token: '34589798vfjkdfgjkljdslk094345rf'
  };
  getToken(): string {
    return localStorage.getItem('token');
  }
  isLoggedIn() {
    const token = this.getToken();
    return token != null;
  }
  userSubject: Subject<User>;

  constructor(private http: HttpClient,
    private router: Router,
    public loaderService: LoaderService

  ) {
    this.userSubject = new Subject<User>();
  }

  mockLoginAPI(username: string, password: string): Observable<User> {
    return of({
      firstname: 'Nitin',
      lastname: 'Jaryal',
      id: '34589798vfjkdfgjkljdslk094345rf'
    } as User).pipe(delay(1500));

  }

  login(username: string, password: string): Observable<any> {
    this.loaderService.isFullScreenLoader = true;
    return new Observable((observer) => {
      if (username.toLowerCase() == this.testuser.username && password === this.testuser.password) {
        observer.next({ username: this.testuser.username, token: this.testuser.token });
        this.persistUser(this.testuser);
        this.loaderService.isFullScreenLoader = false;
      } else {
        observer.error({ error: 'invalid credentials.' });
      }
      observer.complete();
    });
  }

  persistUser(user: User) {
    this.userSubject.next(user);
    localStorage.setItem('currentUser', user.id);
    this.router.navigate(['courses/list']);
  }

  logout() {
    this.loaderService.isFullScreenLoader = true;
    this.userSubject.next(null);
    localStorage.removeItem('currentUser');
    this.loaderService.isFullScreenLoader = false;
    this.router.navigate(['/login']);
  }
}
