import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltriServizi } from './filtri-servizi';

describe('FiltriServizi', () => {
  let component: FiltriServizi;
  let fixture: ComponentFixture<FiltriServizi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltriServizi],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltriServizi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
