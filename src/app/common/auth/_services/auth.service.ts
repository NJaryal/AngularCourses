import { LoaderService } from './../../services/loader.service';
import { Observable } from 'rxjs';
import { of, Subject } from 'rxjs';
// import { Observable } from 'rxjs';
import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthService {
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
      lastname: 'Jryal',
      id: '34589798vfjkdfgjkljdslk094345rf'
    } as User).pipe(delay(1500));

  }
  login(username: string, password: string) {
    this.loaderService.isFullScreenLoader = true;
    this.mockLoginAPI(username, password).subscribe(user => {
      this.persistUser(user);
      this.loaderService.isFullScreenLoader = false;
    });
    // this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username: username, password: password }).subscribe(
    //   res => { }
    // )
  }

  persistUser(user: User) {
    this.userSubject.next(user);
    localStorage.setItem('currentUser', user.id);
    this.router.navigate(['courses/list']);
  }

  logout() {
    // remove user from local storage to log user out
    this.loaderService.isFullScreenLoader = true;
    this.userSubject.next(null);
    localStorage.removeItem('currentUser');
    this.loaderService.isFullScreenLoader = false;
    this.router.navigate(['/login']);
  }
}
