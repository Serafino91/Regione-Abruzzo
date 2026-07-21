import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-scegli-utenza',
  imports: [],
  standalone: true,
  templateUrl: './scegli-utenza.html',
  styleUrl: './scegli-utenza.css',
})
export class ScegliUtenza {
  @Input({ required: true })
  formGroup!: FormGroup;
}
