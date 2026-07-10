import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioRichiesta } from './dettaglio-richiesta';

describe('DettaglioRichiesta', () => {
  let component: DettaglioRichiesta;
  let fixture: ComponentFixture<DettaglioRichiesta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettaglioRichiesta],
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioRichiesta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
