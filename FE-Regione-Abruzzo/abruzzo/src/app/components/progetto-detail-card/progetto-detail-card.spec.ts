import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgettoDetailCard } from './progetto-detail-card';

describe('ProgettoDetailCard', () => {
  let component: ProgettoDetailCard;
  let fixture: ComponentFixture<ProgettoDetailCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgettoDetailCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgettoDetailCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
