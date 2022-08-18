import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMercadoDeletarComponent } from './modal-mercado-deletar.component';

describe('ModalMercadoDeletarComponent', () => {
  let component: ModalMercadoDeletarComponent;
  let fixture: ComponentFixture<ModalMercadoDeletarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMercadoDeletarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMercadoDeletarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
