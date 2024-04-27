import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeDepartmentComponent } from './add-employee-department.component';

describe('AddEmployeeDepartmentComponent', () => {
  let component: AddEmployeeDepartmentComponent;
  let fixture: ComponentFixture<AddEmployeeDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEmployeeDepartmentComponent]
    });
    fixture = TestBed.createComponent(AddEmployeeDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
