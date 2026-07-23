import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAccreditamento } from './pre-accreditamento';

describe('PreAccreditamento', () => {
  let component: PreAccreditamento;
  let fixture: ComponentFixture<PreAccreditamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreAccreditamento],
    }).compileComponents();

    fixture = TestBed.createComponent(PreAccreditamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
