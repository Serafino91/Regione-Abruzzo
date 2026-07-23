import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScegliUtenza } from './scegli-utenza';

describe('ScegliUtenza', () => {
  let component: ScegliUtenza;
  let fixture: ComponentFixture<ScegliUtenza>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScegliUtenza],
    }).compileComponents();

    fixture = TestBed.createComponent(ScegliUtenza);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
