import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaFileIncidentTicket } from './tabella-file-incident-ticket';

describe('TabellaFileIncidentTicket', () => {
  let component: TabellaFileIncidentTicket;
  let fixture: ComponentFixture<TabellaFileIncidentTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaFileIncidentTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(TabellaFileIncidentTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
