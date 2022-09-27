import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClienteCriarComponent } from './modal-cliente-criar.component';

describe('ModalClienteCriarComponent', () => {
  let component: ModalClienteCriarComponent;
  let fixture: ComponentFixture<ModalClienteCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClienteCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalClienteCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
