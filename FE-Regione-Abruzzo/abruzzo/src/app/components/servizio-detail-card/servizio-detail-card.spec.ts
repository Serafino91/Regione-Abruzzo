import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServizioDetailCard } from './servizio-detail-card';

describe('ServizioDetailCard', () => {
  let component: ServizioDetailCard;
  let fixture: ComponentFixture<ServizioDetailCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServizioDetailCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ServizioDetailCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
