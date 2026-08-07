import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDaGestire } from './ticket-da-gestire';

describe('TicketDaGestire', () => {
  let component: TicketDaGestire;
  let fixture: ComponentFixture<TicketDaGestire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketDaGestire],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketDaGestire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
