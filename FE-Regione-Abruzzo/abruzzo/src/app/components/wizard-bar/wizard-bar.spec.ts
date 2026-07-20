import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardBar } from './wizard-bar';

describe('WizardBar', () => {
  let component: WizardBar;
  let fixture: ComponentFixture<WizardBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardBar],
    }).compileComponents();

    fixture = TestBed.createComponent(WizardBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
