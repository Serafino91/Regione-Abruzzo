import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Filtri } from './filtri';

describe('Filtri', () => {
  let component: Filtri;
  let fixture: ComponentFixture<Filtri>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filtri],
    }).compileComponents();

    fixture = TestBed.createComponent(Filtri);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
