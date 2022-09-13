import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClienteEditarComponent } from './modal-cliente-editar.component';

describe('ModalClienteEditarComponent', () => {
  let component: ModalClienteEditarComponent;
  let fixture: ComponentFixture<ModalClienteEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClienteEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalClienteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
