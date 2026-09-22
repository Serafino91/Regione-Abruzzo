import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIaaS } from './form-iaa-s';

describe('FormIaaS', () => {
  let component: FormIaaS;
  let fixture: ComponentFixture<FormIaaS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIaaS],
    }).compileComponents();

    fixture = TestBed.createComponent(FormIaaS);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
