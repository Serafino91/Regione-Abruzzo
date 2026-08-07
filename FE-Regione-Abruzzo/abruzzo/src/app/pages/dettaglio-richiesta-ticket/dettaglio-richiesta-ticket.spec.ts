import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioRichiestaTicket } from './dettaglio-richiesta-ticket';

describe('DettaglioRichiestaTicket', () => {
  let component: DettaglioRichiestaTicket;
  let fixture: ComponentFixture<DettaglioRichiestaTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettaglioRichiestaTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioRichiestaTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
