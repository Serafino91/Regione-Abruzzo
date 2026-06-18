import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServizioCard } from './servizio-card';

describe('ServizioCard', () => {
  let component: ServizioCard;
  let fixture: ComponentFixture<ServizioCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServizioCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ServizioCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
