import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoIncident } from './nuovo-incident';

describe('NuovoIncident', () => {
  let component: NuovoIncident;
  let fixture: ComponentFixture<NuovoIncident>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuovoIncident],
    }).compileComponents();

    fixture = TestBed.createComponent(NuovoIncident);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
