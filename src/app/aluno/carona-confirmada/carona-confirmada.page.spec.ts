import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaronaConfirmadaPage } from './carona-confirmada.page';

describe('CaronaConfirmadaPage', () => {
  let component: CaronaConfirmadaPage;
  let fixture: ComponentFixture<CaronaConfirmadaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CaronaConfirmadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
