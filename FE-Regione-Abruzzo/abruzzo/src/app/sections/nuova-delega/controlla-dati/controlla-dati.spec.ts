import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllaDati } from './controlla-dati';

describe('ControllaDati', () => {
  let component: ControllaDati;
  let fixture: ComponentFixture<ControllaDati>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControllaDati],
    }).compileComponents();

    fixture = TestBed.createComponent(ControllaDati);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
