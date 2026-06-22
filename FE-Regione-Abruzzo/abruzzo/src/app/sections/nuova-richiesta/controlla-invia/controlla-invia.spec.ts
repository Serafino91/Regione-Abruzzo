import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllaInvia } from './controlla-invia';

describe('ControllaInvia', () => {
  let component: ControllaInvia;
  let fixture: ComponentFixture<ControllaInvia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControllaInvia],
    }).compileComponents();

    fixture = TestBed.createComponent(ControllaInvia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
