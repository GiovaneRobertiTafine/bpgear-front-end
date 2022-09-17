import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDropdownAutoCompleteComponent } from './input-dropdown-auto-complete.component';

describe('InputDropdownAutoCompleteComponent', () => {
  let component: InputDropdownAutoCompleteComponent;
  let fixture: ComponentFixture<InputDropdownAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDropdownAutoCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDropdownAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
