import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCriarPage } from './cliente-criar.page';

describe('ClienteCriarPage', () => {
  let component: ClienteCriarPage;
  let fixture: ComponentFixture<ClienteCriarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteCriarPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteCriarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
