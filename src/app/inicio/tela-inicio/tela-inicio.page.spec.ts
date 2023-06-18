import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaInicioPage } from './tela-inicio.page';

describe('TelaInicioPage', () => {
  let component: TelaInicioPage;
  let fixture: ComponentFixture<TelaInicioPage>;

  beforeEach((async() => {
    fixture = TestBed.createComponent(TelaInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
