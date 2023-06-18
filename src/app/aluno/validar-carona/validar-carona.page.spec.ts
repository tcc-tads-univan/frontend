import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarCaronaPage } from './validar-carona.page';

describe('ValidarCaronaPage', () => {
  let component: ValidarCaronaPage;
  let fixture: ComponentFixture<ValidarCaronaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ValidarCaronaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
