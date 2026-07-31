import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltriIncidentTicket } from './filtri-incident-ticket';

describe('FiltriIncidentTicket', () => {
  let component: FiltriIncidentTicket;
  let fixture: ComponentFixture<FiltriIncidentTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltriIncidentTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltriIncidentTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
