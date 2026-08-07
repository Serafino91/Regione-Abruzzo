import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaAccreditamentiTicket } from './tabella-accreditamenti-ticket';

describe('TabellaAccreditamentiTicket', () => {
  let component: TabellaAccreditamentiTicket;
  let fixture: ComponentFixture<TabellaAccreditamentiTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaAccreditamentiTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(TabellaAccreditamentiTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
