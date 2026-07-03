import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accreditamento } from './accreditamento';

describe('Accreditamento', () => {
  let component: Accreditamento;
  let fixture: ComponentFixture<Accreditamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accreditamento],
    }).compileComponents();

    fixture = TestBed.createComponent(Accreditamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
