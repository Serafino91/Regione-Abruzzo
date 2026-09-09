import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaServiziProgetto } from './tabella-servizi-progetto';

describe('TabellaServiziProgetto', () => {
  let component: TabellaServiziProgetto;
  let fixture: ComponentFixture<TabellaServiziProgetto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaServiziProgetto],
    }).compileComponents();

    fixture = TestBed.createComponent(TabellaServiziProgetto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
