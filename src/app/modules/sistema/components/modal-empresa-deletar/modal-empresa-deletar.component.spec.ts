import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmpresaDeletarComponent } from './modal-empresa-deletar.component';

describe('ModalEmpresaDeletarComponent', () => {
  let component: ModalEmpresaDeletarComponent;
  let fixture: ComponentFixture<ModalEmpresaDeletarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEmpresaDeletarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmpresaDeletarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
