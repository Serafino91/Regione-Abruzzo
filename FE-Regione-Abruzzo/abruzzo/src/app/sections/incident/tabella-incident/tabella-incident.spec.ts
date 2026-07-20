import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaIncident } from './tabella-incident';

describe('TabellaIncident', () => {
  let component: TabellaIncident;
  let fixture: ComponentFixture<TabellaIncident>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaIncident],
    }).compileComponents();

    fixture = TestBed.createComponent(TabellaIncident);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
