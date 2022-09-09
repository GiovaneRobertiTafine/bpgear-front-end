import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalharComponent } from './modal-detalhar.component';

describe('ModalDetalharComponent', () => {
  let component: ModalDetalharComponent;
  let fixture: ComponentFixture<ModalDetalharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetalharComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
