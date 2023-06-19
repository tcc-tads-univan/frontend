import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitarCaronaPage } from './solicitar-carona.page';

describe('SolicitarCaronaPage', () => {
  let component: SolicitarCaronaPage;
  let fixture: ComponentFixture<SolicitarCaronaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SolicitarCaronaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
