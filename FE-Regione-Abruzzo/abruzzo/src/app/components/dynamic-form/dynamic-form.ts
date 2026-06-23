import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParamentroModel } from '../../model/parametro.model';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.css',
})
export class DynamicForm {

  @Input() params: ParamentroModel[] = [];

  values: Record<string, any> = {};

  increment(param: ParamentroModel): void {
    const max = Number(param.maxValue);

    if (this.values[param.id] == null) {
      this.values[param.id] = Number(param.minValue);
    }

    if (this.values[param.id] < max) {
      this.values[param.id]++;
    }
  }

  decrement(param: ParamentroModel): void {
    const min = Number(param.minValue);

    if (this.values[param.id] == null) {
      this.values[param.id] = min;
    }

    if (this.values[param.id] > min) {
      this.values[param.id]--;
    }
  }

  submit(): void {
    console.log(this.values);
  }
}
