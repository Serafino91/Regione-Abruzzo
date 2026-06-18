import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovaRichiesta } from './nuova-richiesta';

describe('NuovaRichiesta', () => {
  let component: NuovaRichiesta;
  let fixture: ComponentFixture<NuovaRichiesta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuovaRichiesta],
    }).compileComponents();

    fixture = TestBed.createComponent(NuovaRichiesta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
