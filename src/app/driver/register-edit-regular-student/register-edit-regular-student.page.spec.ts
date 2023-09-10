import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterEditRegularStudentPage } from './register-edit-regular-student.page';

describe('RegisterEditRegularStudentPage', () => {
  let component: RegisterEditRegularStudentPage;
  let fixture: ComponentFixture<RegisterEditRegularStudentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterEditRegularStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
