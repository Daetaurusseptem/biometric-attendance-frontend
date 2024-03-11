import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartamentoComponent } from './create-departamento.component';

describe('CreateDepartamentoComponent', () => {
  let component: CreateDepartamentoComponent;
  let fixture: ComponentFixture<CreateDepartamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDepartamentoComponent]
    });
    fixture = TestBed.createComponent(CreateDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
