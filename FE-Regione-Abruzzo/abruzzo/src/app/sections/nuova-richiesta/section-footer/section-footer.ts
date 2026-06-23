import { Component, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-section-footer',
  imports: [],
  templateUrl: './section-footer.html',
  styleUrl: './section-footer.css',
  standalone: true,
})
export class SectionFooter {
  @Input() currentStep: number = 1;
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
}
