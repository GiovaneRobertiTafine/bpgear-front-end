import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValorCriarComponent } from './modal-valor-criar.component';

describe('ModalValorCriarComponent', () => {
  let component: ModalValorCriarComponent;
  let fixture: ComponentFixture<ModalValorCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalValorCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalValorCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
