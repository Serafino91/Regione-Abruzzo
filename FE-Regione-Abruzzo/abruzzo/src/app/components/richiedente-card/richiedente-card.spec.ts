import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiedenteCard } from './richiedente-card';

describe('RichiedenteCard', () => {
  let component: RichiedenteCard;
  let fixture: ComponentFixture<RichiedenteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichiedenteCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RichiedenteCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
