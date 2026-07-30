import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgettiInCorso } from './progetti-in-corso';

describe('ProgettiInCorso', () => {
  let component: ProgettiInCorso;
  let fixture: ComponentFixture<ProgettiInCorso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgettiInCorso],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgettiInCorso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
