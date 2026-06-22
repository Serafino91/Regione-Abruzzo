import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelezionaServizio } from './seleziona-servizio';

describe('SelezionaServizio', () => {
  let component: SelezionaServizio;
  let fixture: ComponentFixture<SelezionaServizio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelezionaServizio],
    }).compileComponents();

    fixture = TestBed.createComponent(SelezionaServizio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
