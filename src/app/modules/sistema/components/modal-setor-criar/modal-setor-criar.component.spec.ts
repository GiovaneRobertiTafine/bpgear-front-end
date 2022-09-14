import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetorCriarComponent } from './modal-setor-criar.component';

describe('ModalSetorCriarComponent', () => {
  let component: ModalSetorCriarComponent;
  let fixture: ComponentFixture<ModalSetorCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSetorCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSetorCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
