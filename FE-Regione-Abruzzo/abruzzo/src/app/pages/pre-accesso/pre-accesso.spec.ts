import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAccesso } from './pre-accesso';

describe('PreAccesso', () => {
  let component: PreAccesso;
  let fixture: ComponentFixture<PreAccesso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreAccesso],
    }).compileComponents();

    fixture = TestBed.createComponent(PreAccesso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
