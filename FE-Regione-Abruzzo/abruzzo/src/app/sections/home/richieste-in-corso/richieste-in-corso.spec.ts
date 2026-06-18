import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiesteInCorso } from './richieste-in-corso';

describe('RichiesteInCorso', () => {
  let component: RichiesteInCorso;
  let fixture: ComponentFixture<RichiesteInCorso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichiesteInCorso],
    }).compileComponents();

    fixture = TestBed.createComponent(RichiesteInCorso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
