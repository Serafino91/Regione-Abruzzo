import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioProgetto } from './dettaglio-progetto';

describe('DettaglioProgetto', () => {
  let component: DettaglioProgetto;
  let fixture: ComponentFixture<DettaglioProgetto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettaglioProgetto],
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioProgetto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
