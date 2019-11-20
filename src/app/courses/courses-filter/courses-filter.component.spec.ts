import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesFilterComponent } from './courses-filter.component';
import { FormsModule } from '@angular/forms';

describe('CoursesFilterComponent', () => {
  let component: CoursesFilterComponent;
  let fixture: ComponentFixture<CoursesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ CoursesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
