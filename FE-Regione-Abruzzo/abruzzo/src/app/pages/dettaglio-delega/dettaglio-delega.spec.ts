import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioDelega } from './dettaglio-delega';

describe('DettaglioDelega', () => {
  let component: DettaglioDelega;
  let fixture: ComponentFixture<DettaglioDelega>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettaglioDelega],
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioDelega);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
