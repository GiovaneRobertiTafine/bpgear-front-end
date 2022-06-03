import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmpresaEditarComponent } from './modal-empresa-editar.component';

describe('ModalEmpresaEditarComponent', () => {
  let component: ModalEmpresaEditarComponent;
  let fixture: ComponentFixture<ModalEmpresaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEmpresaEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmpresaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
