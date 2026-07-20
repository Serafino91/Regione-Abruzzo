import { Component, Input } from '@angular/core';
import { WizardLabelItem } from '../../constants/WizardLabelItem';

@Component({
  selector: 'app-wizard-bar',
  imports: [],
  standalone: true,
  templateUrl: './wizard-bar.html',
  styleUrl: './wizard-bar.css',
})
export class WizardBar {
  @Input({ required: true }) items: WizardLabelItem[] = [];

  @Input({ required: true }) currentStep = 1;
}
