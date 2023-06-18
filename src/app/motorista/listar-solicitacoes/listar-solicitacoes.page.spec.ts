import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarSolicitacoesPage } from './listar-solicitacoes.page';

describe('ListarSolicitacoesPage', () => {
  let component: ListarSolicitacoesPage;
  let fixture: ComponentFixture<ListarSolicitacoesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListarSolicitacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
