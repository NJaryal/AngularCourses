import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoursesListComponent } from './courses-list.component';

@Component({
  template: `<app-courses-list (myOutput)=onDeleteIDEvent($event)></app-courses-list>`,
})
class TestCoursesListComponent {
  public myOutput = {id: 1};
  public myOutputcourseId: number;

  public onDeleteIDEvent() {
    this.myOutputcourseId = this.myOutput.id;
  }
}

describe('TestCoursesListComponent', () => {
  let testHostComponent: TestCoursesListComponent;
  let fixture: ComponentFixture<TestCoursesListComponent>;
  let debugElement: DebugElement;
  let output;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCoursesListComponent,
        CoursesListComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestCoursesListComponent);
    debugElement = fixture.debugElement;
  }));

  it('should delete ID by @Output', () => {
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button.btn-danger')).triggerEventHandler('click', null);
    expect(testHostComponent.myOutput).toBeFalsy();
  });
});
