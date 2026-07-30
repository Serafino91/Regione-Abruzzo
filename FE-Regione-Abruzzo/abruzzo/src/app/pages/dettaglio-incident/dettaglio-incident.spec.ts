import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioIncident } from './dettaglio-incident';

describe('DettaglioIncident', () => {
  let component: DettaglioIncident;
  let fixture: ComponentFixture<DettaglioIncident>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettaglioIncident],
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioIncident);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
