import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServizioInfoBar } from './servizio-info-bar';

describe('ServizioInfoBar', () => {
  let component: ServizioInfoBar;
  let fixture: ComponentFixture<ServizioInfoBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServizioInfoBar],
    }).compileComponents();

    fixture = TestBed.createComponent(ServizioInfoBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
