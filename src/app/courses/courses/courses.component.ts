import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onDeleteIDEvent(id: string): void {
    console.log(`Course having ID - ${id} deleted!`);
  }

}
