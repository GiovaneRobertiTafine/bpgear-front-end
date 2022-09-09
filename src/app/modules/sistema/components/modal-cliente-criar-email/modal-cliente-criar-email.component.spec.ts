import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClienteCriarEmailComponent } from './modal-cliente-criar-email.component';

describe('ModalClienteCriarEmailComponent', () => {
  let component: ModalClienteCriarEmailComponent;
  let fixture: ComponentFixture<ModalClienteCriarEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClienteCriarEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalClienteCriarEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
