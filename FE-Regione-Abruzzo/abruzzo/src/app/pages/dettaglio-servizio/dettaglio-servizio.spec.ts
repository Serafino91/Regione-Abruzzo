import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioServizio } from './dettaglio-servizio';

describe('DettaglioServizio', () => {
  let component: DettaglioServizio;
  let fixture: ComponentFixture<DettaglioServizio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettaglioServizio],
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioServizio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
