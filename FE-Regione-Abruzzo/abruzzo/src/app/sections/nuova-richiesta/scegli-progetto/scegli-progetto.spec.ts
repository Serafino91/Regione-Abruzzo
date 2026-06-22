import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScegliProgetto } from './scegli-progetto';

describe('ScegliProgetto', () => {
  let component: ScegliProgetto;
  let fixture: ComponentFixture<ScegliProgetto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScegliProgetto],
    }).compileComponents();

    fixture = TestBed.createComponent(ScegliProgetto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
