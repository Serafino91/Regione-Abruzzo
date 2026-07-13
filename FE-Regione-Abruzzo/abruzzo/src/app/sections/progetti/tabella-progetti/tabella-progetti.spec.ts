import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaProgetti } from './tabella-progetti';

describe('TabellaProgetti', () => {
  let component: TabellaProgetti;
  let fixture: ComponentFixture<TabellaProgetti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaProgetti],
    }).compileComponents();

    fixture = TestBed.createComponent(TabellaProgetti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
