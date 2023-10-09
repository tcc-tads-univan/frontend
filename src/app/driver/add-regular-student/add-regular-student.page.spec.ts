import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRegularStudentPage } from './add-regular-student.page';

describe('AddRegularStudentPage', () => {
  let component: AddRegularStudentPage;
  let fixture: ComponentFixture<AddRegularStudentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddRegularStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
