import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioIncidentTicket } from './dettaglio-incident-ticket';

describe('DettaglioIncidentTicket', () => {
  let component: DettaglioIncidentTicket;
  let fixture: ComponentFixture<DettaglioIncidentTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettaglioIncidentTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioIncidentTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
