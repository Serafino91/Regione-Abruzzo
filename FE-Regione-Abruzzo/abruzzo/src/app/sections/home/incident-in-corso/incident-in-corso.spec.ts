import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentInCorso } from './incident-in-corso';

describe('IncidentInCorso', () => {
  let component: IncidentInCorso;
  let fixture: ComponentFixture<IncidentInCorso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentInCorso],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentInCorso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
