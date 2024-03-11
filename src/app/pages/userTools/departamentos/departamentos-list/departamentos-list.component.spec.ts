import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentosListComponent } from './departamentos-list.component';

describe('DepartamentosListComponent', () => {
  let component: DepartamentosListComponent;
  let fixture: ComponentFixture<DepartamentosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartamentosListComponent]
    });
    fixture = TestBed.createComponent(DepartamentosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
