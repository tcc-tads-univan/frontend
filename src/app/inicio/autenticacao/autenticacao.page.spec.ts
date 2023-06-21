import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutenticacaoPage } from './autenticacao.page';

describe('AutenticacaoPage', () => {
  let component: AutenticacaoPage;
  let fixture: ComponentFixture<AutenticacaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AutenticacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
