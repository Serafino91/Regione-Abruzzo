import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltriDeleghe } from './filtri-deleghe';

describe('FiltriDeleghe', () => {
  let component: FiltriDeleghe;
  let fixture: ComponentFixture<FiltriDeleghe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltriDeleghe],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltriDeleghe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
