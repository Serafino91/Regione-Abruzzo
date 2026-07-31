import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentAccordion } from './incident-accordion';

describe('IncidentAccordion', () => {
  let component: IncidentAccordion;
  let fixture: ComponentFixture<IncidentAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentAccordion],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentAccordion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
