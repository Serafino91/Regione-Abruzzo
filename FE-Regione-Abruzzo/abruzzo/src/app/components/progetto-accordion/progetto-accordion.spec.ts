import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgettoAccordion } from './progetto-accordion';

describe('ProgettoAccordion', () => {
  let component: ProgettoAccordion;
  let fixture: ComponentFixture<ProgettoAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgettoAccordion],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgettoAccordion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
