import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColaboradorEditarComponent } from './modal-colaborador-editar.component';

describe('ModalColaboradorEditarComponent', () => {
  let component: ModalColaboradorEditarComponent;
  let fixture: ComponentFixture<ModalColaboradorEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalColaboradorEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalColaboradorEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
