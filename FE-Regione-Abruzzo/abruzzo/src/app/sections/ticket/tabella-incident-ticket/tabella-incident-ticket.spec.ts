import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaIncidentTicket } from './tabella-incident-ticket';

describe('TabellaIncidentTicket', () => {
  let component: TabellaIncidentTicket;
  let fixture: ComponentFixture<TabellaIncidentTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaIncidentTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(TabellaIncidentTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
