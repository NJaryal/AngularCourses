import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[sortCourseDirective]'
})
export class SortCourseDirective implements OnInit {
  @Input() creationdate: Date;
  currentElement: ElementRef;
  constructor(private el: ElementRef) {
    this.currentElement = el;
  }

  ngOnInit() {
    const creationdate = new Date(this.creationdate);
    const currentDate = new Date();
    const previousDate = new Date();
    const backDate = new Date(previousDate.setDate(currentDate.getDate() - 14));
    if (creationdate < currentDate && creationdate >= backDate) {
      this.currentElement.nativeElement.style.border = '10px solid green';
    } else if (creationdate > currentDate) {
      this.currentElement.nativeElement.style.border = '10px solid blue';
    } else {
      this.currentElement.nativeElement.style.border = 'none';
    }
  }
}
