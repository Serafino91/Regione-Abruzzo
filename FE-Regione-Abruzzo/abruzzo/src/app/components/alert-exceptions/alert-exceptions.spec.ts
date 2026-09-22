import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertExceptions } from './alert-exceptions';

describe('AlertExceptions', () => {
  let component: AlertExceptions;
  let fixture: ComponentFixture<AlertExceptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertExceptions],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertExceptions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
