import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient,
                private router: Router) { }

    login(username: string, password: string) {
        this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username: username, password: password })
            /* .pipe(map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
          */
        if(username==='test'&&password==='test1234'){
          localStorage.setItem('currentUser','34589798vfjkdfgjkljdslk094345rf');
          this.router.navigate(['courses/list']);
        } else {
          localStorage.setItem('currentUser','Unauthorized');
          this.router.navigate(['/login']);
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
