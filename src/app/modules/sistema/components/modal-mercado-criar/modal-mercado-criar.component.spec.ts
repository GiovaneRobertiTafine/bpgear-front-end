import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMercadoCriarComponent } from './modal-mercado-criar.component';

describe('ModalMercadoCriarComponent', () => {
  let component: ModalMercadoCriarComponent;
  let fixture: ComponentFixture<ModalMercadoCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMercadoCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMercadoCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
