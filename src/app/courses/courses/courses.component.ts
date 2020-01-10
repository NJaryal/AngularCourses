import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/common/services/courses.service';
import { ModalService } from 'src/app/common/modal/modal.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(private coursesService: CoursesService, private modalService: ModalService) { }

  ngOnInit() {
  }

  onDeleteIDEvent(id: string): void {
    this.openModal('course-modal-delete');
    this.coursesService.deleteItem(id);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }


}
