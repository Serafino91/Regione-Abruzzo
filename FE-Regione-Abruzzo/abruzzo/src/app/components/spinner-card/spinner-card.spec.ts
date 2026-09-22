import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerCard } from './spinner-card';

describe('SpinnerCard', () => {
  let component: SpinnerCard;
  let fixture: ComponentFixture<SpinnerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
