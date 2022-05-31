import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmpresaCriarComponent } from './modal-empresa-criar.component';

describe('ModalEmpresaCriarComponent', () => {
  let component: ModalEmpresaCriarComponent;
  let fixture: ComponentFixture<ModalEmpresaCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEmpresaCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmpresaCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
