import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBemServicoCriarComponent } from './modal-bem-servico-criar.component';

describe('ModalBemServicoCriarComponent', () => {
  let component: ModalBemServicoCriarComponent;
  let fixture: ComponentFixture<ModalBemServicoCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBemServicoCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBemServicoCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
