import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M2Page } from './m2.page';

describe('M2Page', () => {
  let component: M2Page;
  let fixture: ComponentFixture<M2Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ M2Page ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(M2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
