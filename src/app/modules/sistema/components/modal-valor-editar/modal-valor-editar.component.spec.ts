import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValorEditarComponent } from './modal-valor-editar.component';

describe('ModalValorEditarComponent', () => {
  let component: ModalValorEditarComponent;
  let fixture: ComponentFixture<ModalValorEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalValorEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalValorEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
