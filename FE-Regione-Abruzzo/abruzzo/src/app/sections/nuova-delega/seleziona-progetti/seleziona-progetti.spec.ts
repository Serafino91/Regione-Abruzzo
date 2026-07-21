import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelezionaProgetti } from './seleziona-progetti';

describe('SelezionaProgetti', () => {
  let component: SelezionaProgetti;
  let fixture: ComponentFixture<SelezionaProgetti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelezionaProgetti],
    }).compileComponents();

    fixture = TestBed.createComponent(SelezionaProgetti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
