import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deleghe } from './deleghe';

describe('Deleghe', () => {
  let component: Deleghe;
  let fixture: ComponentFixture<Deleghe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deleghe],
    }).compileComponents();

    fixture = TestBed.createComponent(Deleghe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
