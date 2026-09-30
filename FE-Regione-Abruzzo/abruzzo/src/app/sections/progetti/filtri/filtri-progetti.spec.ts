import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltriProgetti } from './filtri-progetti';

describe('FiltriProgetti', () => {
  let component: FiltriProgetti;
  let fixture: ComponentFixture<FiltriProgetti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltriProgetti],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltriProgetti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
