import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BemServicoPage } from './bem-servico.page';

describe('BemServicoPage', () => {
  let component: BemServicoPage;
  let fixture: ComponentFixture<BemServicoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BemServicoPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BemServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
