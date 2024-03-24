import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosAttendancesComponent } from './empleados-attendances.component';

describe('EmpleadosAttendancesComponent', () => {
  let component: EmpleadosAttendancesComponent;
  let fixture: ComponentFixture<EmpleadosAttendancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadosAttendancesComponent]
    });
    fixture = TestBed.createComponent(EmpleadosAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
