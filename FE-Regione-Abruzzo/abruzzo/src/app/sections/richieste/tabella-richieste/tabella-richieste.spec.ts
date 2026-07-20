import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaRichieste } from './tabella-richieste';

describe('TabellaRichieste', () => {
  let component: TabellaRichieste;
  let fixture: ComponentFixture<TabellaRichieste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaRichieste],
    }).compileComponents();

    fixture = TestBed.createComponent(TabellaRichieste);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
