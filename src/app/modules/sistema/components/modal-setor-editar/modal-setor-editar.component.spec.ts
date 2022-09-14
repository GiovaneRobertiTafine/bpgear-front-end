import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetorEditarComponent } from './modal-setor-editar.component';

describe('ModalSetorEditarComponent', () => {
  let component: ModalSetorEditarComponent;
  let fixture: ComponentFixture<ModalSetorEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSetorEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSetorEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
