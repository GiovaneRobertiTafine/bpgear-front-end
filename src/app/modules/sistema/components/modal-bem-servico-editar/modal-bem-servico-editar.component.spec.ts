import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBemServicoEditarComponent } from './modal-bem-servico-editar.component';

describe('ModalBemServicoEditarComponent', () => {
  let component: ModalBemServicoEditarComponent;
  let fixture: ComponentFixture<ModalBemServicoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBemServicoEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBemServicoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
