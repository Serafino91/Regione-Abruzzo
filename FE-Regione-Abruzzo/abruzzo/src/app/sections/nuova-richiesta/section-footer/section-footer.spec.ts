import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFooter } from './section-footer';

describe('SectionFooter', () => {
  let component: SectionFooter;
  let fixture: ComponentFixture<SectionFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
