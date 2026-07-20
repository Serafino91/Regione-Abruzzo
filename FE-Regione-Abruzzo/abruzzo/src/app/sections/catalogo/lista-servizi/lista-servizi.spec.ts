import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaServizi } from './lista-servizi';

describe('ListaServizi', () => {
  let component: ListaServizi;
  let fixture: ComponentFixture<ListaServizi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaServizi],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaServizi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
