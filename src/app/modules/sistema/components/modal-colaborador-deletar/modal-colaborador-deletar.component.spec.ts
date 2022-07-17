import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColaboradorDeletarComponent } from './modal-colaborador-deletar.component';

describe('ModalColaboradorDeletarComponent', () => {
  let component: ModalColaboradorDeletarComponent;
  let fixture: ComponentFixture<ModalColaboradorDeletarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalColaboradorDeletarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalColaboradorDeletarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
