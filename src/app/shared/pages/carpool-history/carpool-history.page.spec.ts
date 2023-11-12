import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarpoolHistoryPage } from './carpool-history.page';

describe('CarpoolHistoryPage', () => {
  let component: CarpoolHistoryPage;
  let fixture: ComponentFixture<CarpoolHistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CarpoolHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
