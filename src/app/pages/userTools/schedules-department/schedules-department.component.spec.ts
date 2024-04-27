import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesDepartmentComponent } from './schedules-department.component';

describe('SchedulesDepartmentComponent', () => {
  let component: SchedulesDepartmentComponent;
  let fixture: ComponentFixture<SchedulesDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulesDepartmentComponent]
    });
    fixture = TestBed.createComponent(SchedulesDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
