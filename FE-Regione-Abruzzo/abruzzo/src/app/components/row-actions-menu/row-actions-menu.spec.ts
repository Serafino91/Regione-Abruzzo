import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowActionsMenu } from './row-actions-menu';

describe('RowActionsMenu', () => {
  let component: RowActionsMenu;
  let fixture: ComponentFixture<RowActionsMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowActionsMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(RowActionsMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
