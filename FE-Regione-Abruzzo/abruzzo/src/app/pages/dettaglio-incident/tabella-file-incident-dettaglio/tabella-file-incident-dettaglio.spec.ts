import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaFileIncidentDettaglio } from './tabella-file-incident-dettaglio';

describe('TabellaFileIncidentDettaglio', () => {
  let component: TabellaFileIncidentDettaglio;
  let fixture: ComponentFixture<TabellaFileIncidentDettaglio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaFileIncidentDettaglio],
    }).compileComponents();

    fixture = TestBed.createComponent(TabellaFileIncidentDettaglio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
