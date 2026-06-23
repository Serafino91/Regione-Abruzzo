import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiesteInCorsoCard } from './richieste-in-corso-card';

describe('RichiesteInCorsoCard', () => {
  let component: RichiesteInCorsoCard;
  let fixture: ComponentFixture<RichiesteInCorsoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichiesteInCorsoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RichiesteInCorsoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
