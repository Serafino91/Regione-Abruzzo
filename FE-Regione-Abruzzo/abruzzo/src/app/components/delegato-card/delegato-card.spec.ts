import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatoCard } from './delegato-card';

describe('DelegatoCard', () => {
  let component: DelegatoCard;
  let fixture: ComponentFixture<DelegatoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegatoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DelegatoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
