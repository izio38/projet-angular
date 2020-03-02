import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWeaponComponent } from './form-weapon.component';

describe('FormComponent', () => {
  let component: FormWeaponComponent;
  let fixture: ComponentFixture<FormWeaponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormWeaponComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
