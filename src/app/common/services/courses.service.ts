import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Courses } from '../models/courses.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  public getList() {
    return this.http.get<Courses>(`${environment.coursesApi}/courses?start=0&count=4`);
  }

  public createCourse(course: any) {
    return this.http.post<string>(`${environment.coursesApi}/courses`, course);
  }

  public getItemById(courseId: string): Observable<Courses> {
    return this.http.get<Courses>(`${environment.coursesApi}/courses/${courseId}`);
  }

  public updateCourse(course: any) {
    return this.http.put<string>(`${environment.coursesApi}/courses`, course);
  }

  public deleteItem(id: string) {
    return console.log(`Course having ID ${id} deleted`);
  }
}
