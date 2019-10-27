import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-filter',
  templateUrl: './courses-filter.component.html',
  styleUrls: ['./courses-filter.component.scss']
})
export class CoursesFilterComponent implements OnInit {
  searchText: any;
  constructor() { }

  ngOnInit() {
  }

  searchVal() {
    console.log(this.searchText);
  }

}
