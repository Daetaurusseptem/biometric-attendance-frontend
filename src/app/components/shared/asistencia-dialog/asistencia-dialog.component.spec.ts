import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaDialogComponent } from './asistencia-dialog.component';

describe('AsistenciaDialogComponent', () => {
  let component: AsistenciaDialogComponent;
  let fixture: ComponentFixture<AsistenciaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsistenciaDialogComponent]
    });
    fixture = TestBed.createComponent(AsistenciaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
