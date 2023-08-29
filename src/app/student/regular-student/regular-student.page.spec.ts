import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegularStudentPage } from './regular-student.page';

describe('RegularStudentPage', () => {
  let component: RegularStudentPage;
  let fixture: ComponentFixture<RegularStudentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegularStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
