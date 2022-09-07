import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClienteDeletarComponent } from './modal-cliente-deletar.component';

describe('ModalClienteDeletarComponent', () => {
  let component: ModalClienteDeletarComponent;
  let fixture: ComponentFixture<ModalClienteDeletarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClienteDeletarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalClienteDeletarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
