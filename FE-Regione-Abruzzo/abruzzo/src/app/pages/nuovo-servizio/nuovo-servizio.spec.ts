import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoServizio } from './nuovo-servizio';

describe('NuovoServizio', () => {
  let component: NuovoServizio;
  let fixture: ComponentFixture<NuovoServizio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuovoServizio],
    }).compileComponents();

    fixture = TestBed.createComponent(NuovoServizio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
