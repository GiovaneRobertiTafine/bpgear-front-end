import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorCriarPage } from './colaborador-criar.page';

describe('ColaboradorCriarPage', () => {
  let component: ColaboradorCriarPage;
  let fixture: ComponentFixture<ColaboradorCriarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboradorCriarPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradorCriarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
