import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor() { }

  public getCourses() {
    return [
      {
        id: "1",
        title: "Angular",
        creationdate: new Date(),
        duration: 106,
        description: "Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS.",
        toprated: true
      },
      {
        id: "2",
        title: "React",
        creationdate: new Date("25-Dec-2019"),
        duration: 100,
        description: "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications, as it is optimal for fetching rapidly changing data that needs to be recorded.",
        toprated: false
      },
      {
        id: "3",
        title: "Vue",
        creationdate: new Date("25-Jun-2019"),
        duration: 90,
        description: "Vue.js is an open-source Model–view–viewmodel JavaScript framework for building user interfaces and single-page applications. It was created by Evan You, and is maintained by him and the rest of the active core team members coming from various companies such as Netlify and Netguru.",
        toprated: true
      }
    ]
  }
}
