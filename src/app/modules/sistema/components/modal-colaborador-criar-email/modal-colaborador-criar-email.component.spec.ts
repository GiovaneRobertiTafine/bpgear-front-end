import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColaboradorCriarEmailComponent } from './modal-colaborador-criar-email.component';

describe('ModalColaboradorCriarEmailComponent', () => {
  let component: ModalColaboradorCriarEmailComponent;
  let fixture: ComponentFixture<ModalColaboradorCriarEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalColaboradorCriarEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalColaboradorCriarEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
