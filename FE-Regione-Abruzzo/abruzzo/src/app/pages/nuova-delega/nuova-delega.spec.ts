import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovaDelega } from './nuova-delega';

describe('NuovaDelega', () => {
  let component: NuovaDelega;
  let fixture: ComponentFixture<NuovaDelega>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuovaDelega],
    }).compileComponents();

    fixture = TestBed.createComponent(NuovaDelega);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
