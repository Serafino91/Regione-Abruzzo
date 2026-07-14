import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServizioAccordion } from './servizio-accordion';

describe('ServizioAccordion', () => {
  let component: ServizioAccordion;
  let fixture: ComponentFixture<ServizioAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServizioAccordion],
    }).compileComponents();

    fixture = TestBed.createComponent(ServizioAccordion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
