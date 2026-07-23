import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaDeleghe } from './tabella-deleghe';

describe('TabellaDeleghe', () => {
  let component: TabellaDeleghe;
  let fixture: ComponentFixture<TabellaDeleghe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaDeleghe],
    }).compileComponents();

    fixture = TestBed.createComponent(TabellaDeleghe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
