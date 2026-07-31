import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaRichiesteTicket } from './tabella-richieste-ticket';

describe('TabellaRichiesteTicket', () => {
  let component: TabellaRichiesteTicket;
  let fixture: ComponentFixture<TabellaRichiesteTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaRichiesteTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(TabellaRichiesteTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
