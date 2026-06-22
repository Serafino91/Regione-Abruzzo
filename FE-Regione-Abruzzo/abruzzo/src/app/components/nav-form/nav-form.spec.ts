import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavForm } from './nav-form';

describe('NavForm', () => {
  let component: NavForm;
  let fixture: ComponentFixture<NavForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NavForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
