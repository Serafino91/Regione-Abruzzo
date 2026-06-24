import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParamentroModel } from '../../model/parametro.model';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.css',
})
export class DynamicForm {
  @Input() params: ParamentroModel[] = [];
  @Input() formGroup!: FormGroup;

  increment(param: ParamentroModel) {
    const ctrl = this.formGroup.get(param.name);
    if (!ctrl) return;

    const max = Number(param.maxValue);
    const val = Number(ctrl.value ?? param.minValue);

    if (val < max) {
      ctrl.setValue(val + 1);
    }
  }

  decrement(param: ParamentroModel) {
    const ctrl = this.formGroup.get(param.name);
    if (!ctrl) return;

    const min = Number(param.minValue);
    const val = Number(ctrl.value ?? min);

    if (val > min) {
      ctrl.setValue(val - 1);
    }
  }
}
