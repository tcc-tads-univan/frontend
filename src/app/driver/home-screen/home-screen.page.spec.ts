import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeScreenPage } from './home-screen.page';

describe('HomeScreenPage', () => {
  let component: HomeScreenPage;
  let fixture: ComponentFixture<HomeScreenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
