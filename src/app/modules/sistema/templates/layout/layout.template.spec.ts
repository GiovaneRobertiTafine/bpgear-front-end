import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTemplate } from './layout.template';

describe('LayoutTemplate', () => {
  let component: LayoutTemplate;
  let fixture: ComponentFixture<LayoutTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutTemplate ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
