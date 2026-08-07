import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioAccreditamentoTicket } from './dettaglio-accreditamento-ticket';

describe('DettaglioAccreditamentoTicket', () => {
  let component: DettaglioAccreditamentoTicket;
  let fixture: ComponentFixture<DettaglioAccreditamentoTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettaglioAccreditamentoTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioAccreditamentoTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
