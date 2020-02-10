import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeaponComponent } from './edit-weapon.component';

describe('EditComponent', () => {
  let component: EditWeaponComponent;
  let fixture: ComponentFixture<EditWeaponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWeaponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
