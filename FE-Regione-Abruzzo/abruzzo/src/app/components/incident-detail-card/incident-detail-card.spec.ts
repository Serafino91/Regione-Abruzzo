import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDetailCard } from './incident-detail-card';

describe('IncidentDetailCard', () => {
  let component: IncidentDetailCard;
  let fixture: ComponentFixture<IncidentDetailCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentDetailCard],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentDetailCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
