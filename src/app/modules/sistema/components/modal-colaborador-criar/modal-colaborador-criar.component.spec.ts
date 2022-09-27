import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColaboradorCriarComponent } from './modal-colaborador-criar.component';

describe('ModalColaboradorCriarComponent', () => {
  let component: ModalColaboradorCriarComponent;
  let fixture: ComponentFixture<ModalColaboradorCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalColaboradorCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalColaboradorCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
