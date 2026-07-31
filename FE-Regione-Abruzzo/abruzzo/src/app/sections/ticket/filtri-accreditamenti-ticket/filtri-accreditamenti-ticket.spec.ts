import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltriAccreditamentiTicket } from './filtri-accreditamenti-ticket';

describe('FiltriAccreditamentiTicket', () => {
  let component: FiltriAccreditamentiTicket;
  let fixture: ComponentFixture<FiltriAccreditamentiTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltriAccreditamentiTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltriAccreditamentiTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
