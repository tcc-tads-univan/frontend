import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaronaSolicitadaPage } from './carona-solicitada.page';

describe('CaronaSolicitadaPage', () => {
  let component: CaronaSolicitadaPage;
  let fixture: ComponentFixture<CaronaSolicitadaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CaronaSolicitadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
