import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditamentoForm } from './accreditamento-form';

describe('AccreditamentoForm', () => {
  let component: AccreditamentoForm;
  let fixture: ComponentFixture<AccreditamentoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccreditamentoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AccreditamentoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
