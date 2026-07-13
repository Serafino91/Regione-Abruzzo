import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgettoRow } from './progetto-row';

describe('ProgettoRow', () => {
  let component: ProgettoRow;
  let fixture: ComponentFixture<ProgettoRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgettoRow],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgettoRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
