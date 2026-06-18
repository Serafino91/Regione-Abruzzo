import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgettiFlexbox } from './progetti-flexbox';

describe('ProgettiFlexbox', () => {
  let component: ProgettiFlexbox;
  let fixture: ComponentFixture<ProgettiFlexbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgettiFlexbox],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgettiFlexbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
