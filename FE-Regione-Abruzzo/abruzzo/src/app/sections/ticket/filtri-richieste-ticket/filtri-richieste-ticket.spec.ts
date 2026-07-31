import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltriRichiesteTicket } from './filtri-richieste-ticket';

describe('FiltriRichiesteTicket', () => {
  let component: FiltriRichiesteTicket;
  let fixture: ComponentFixture<FiltriRichiesteTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltriRichiesteTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltriRichiesteTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
