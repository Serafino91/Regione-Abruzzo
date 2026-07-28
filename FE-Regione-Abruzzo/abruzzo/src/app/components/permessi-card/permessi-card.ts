import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface Permessi {
  permessoRichiesta: boolean;
  permessoDelega: boolean;
}

@Component({
  selector: 'app-permessi-card',
  imports: [],
  standalone: true,
  templateUrl: './permessi-card.html',
  styleUrl: './permessi-card.css',
})
export class PermessiCard {
  @Input() updatePermessi = false;

  @Output() permessoRichiesta = new EventEmitter<void>();
  @Output() permessoDelega = new EventEmitter<void>();

  permettiRichiesta(): void {
    this.permessoRichiesta.emit();
  }

  permettiDelega(): void {
    this.permessoDelega.emit();
  }
}
