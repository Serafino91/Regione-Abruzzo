import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermessiCard } from './permessi-card';

describe('PermessiCard', () => {
  let component: PermessiCard;
  let fixture: ComponentFixture<PermessiCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermessiCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PermessiCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
