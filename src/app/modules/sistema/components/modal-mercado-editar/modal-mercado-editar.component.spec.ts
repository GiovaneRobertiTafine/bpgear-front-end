import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMercadoEditarComponent } from './modal-mercado-editar.component';

describe('ModalMercadoEditarComponent', () => {
  let component: ModalMercadoEditarComponent;
  let fixture: ComponentFixture<ModalMercadoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMercadoEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMercadoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
