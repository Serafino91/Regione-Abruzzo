// row-actions-menu.component.ts
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RowAction {
  label: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean; // per stile es. "elimina" in rosso
}

@Component({
  selector: 'app-row-actions-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="row-actions-menu">
      @for (action of actions; track action.label) {
        <li
          class="row-actions-menu__item"
          [class.danger]="action.danger"
          [class.disabled]="action.disabled"
          (click)="select(action)"
        >
          @if (action.icon) {
            <i [class]="action.icon"></i>
          }
          <span>{{ action.label }}</span>
        </li>
      }
    </ul>
  `,
  styles: [
    `
      .row-actions-menu {
        list-style: none;
        margin: 0;
        padding: 6px 0;
        min-width: 180px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 43, 85, 0.18);
        border: 1px solid #e6e9f2;
      }
      .row-actions-menu__item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        font-size: 14px;
        color: #1a1a1a;
        cursor: pointer;
        white-space: nowrap;
      }
      .row-actions-menu__item:hover {
        background-color: #f4f7fc;
      }
      .row-actions-menu__item.danger {
        color: #c0392b;
      }
      .row-actions-menu__item.disabled {
        color: #a0aab4;
        pointer-events: none;
      }
    `,
  ],
})
export class RowActionsMenuComponent {
  @Input() actions: RowAction[] = [];
  @Output() actionSelected = new EventEmitter<RowAction>();

  select(action: RowAction) {
    if (action.disabled) return;
    this.actionSelected.emit(action);
  }
}
