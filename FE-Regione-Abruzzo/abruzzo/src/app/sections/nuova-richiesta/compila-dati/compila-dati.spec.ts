import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilaDati } from './compila-dati';

describe('CompilaDati', () => {
  let component: CompilaDati;
  let fixture: ComponentFixture<CompilaDati>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompilaDati],
    }).compileComponents();

    fixture = TestBed.createComponent(CompilaDati);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
