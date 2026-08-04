import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-app-modal',
  imports: [],
  standalone: true,
  templateUrl: './app-modal.html',
  styleUrl: './app-modal.css',
})
export class AppModal {
  @Input() title = '';
  @Input() message? = '';
  @Input() icon? = '';
  @Input() confirmText = 'Conferma';
  @Input() cancelText = 'Annulla';
  @Input() showCancel = true;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
