import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelServizio } from './label-servizio';

describe('LabelServizio', () => {
  let component: LabelServizio;
  let fixture: ComponentFixture<LabelServizio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelServizio],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelServizio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
