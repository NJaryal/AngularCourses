import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { NewsService } from '../news.service';
//import { Articles } from '../news';
import { CoursesService } from '../../common/services/courses.service';
import { Courses } from 'src/app/common/models/courses.model';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesAddComponent implements OnInit, OnChanges {
  @Input() selectedNewsItem: Courses;
  createCoursessForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadForm();
  }

  ngOnChanges() {
    this.loadForm();
  }

  private loadForm() {
    this.createCoursessForm = this.formBuilder.group({
      title: [ '', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
      duration: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(6)]],
      date: ['', [Validators.required]]
    });
  }

  saveItem() {
    console.log(this.createCoursessForm.value);
  }

}



