import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorPage } from './colaborador.page';

describe('ColaboradorPage', () => {
  let component: ColaboradorPage;
  let fixture: ComponentFixture<ColaboradorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboradorPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
