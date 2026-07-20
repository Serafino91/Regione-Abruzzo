import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltriIncident } from './filtri-incident';

describe('FiltriIncident', () => {
  let component: FiltriIncident;
  let fixture: ComponentFixture<FiltriIncident>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltriIncident],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltriIncident);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
