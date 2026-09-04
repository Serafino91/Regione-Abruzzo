import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaFileIncident } from './tabella-file-incident';

describe('TabellaFileIncident', () => {
  let component: TabellaFileIncident;
  let fixture: ComponentFixture<TabellaFileIncident>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaFileIncident],
    }).compileComponents();

    fixture = TestBed.createComponent(TabellaFileIncident);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
