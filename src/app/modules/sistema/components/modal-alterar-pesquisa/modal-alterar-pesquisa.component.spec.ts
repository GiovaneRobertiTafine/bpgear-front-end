import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlterarPesquisaComponent } from './modal-alterar-pesquisa.component';

describe('ModalAlterarPesquisaComponent', () => {
  let component: ModalAlterarPesquisaComponent;
  let fixture: ComponentFixture<ModalAlterarPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAlterarPesquisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAlterarPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
