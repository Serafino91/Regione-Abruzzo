import { Component, input } from '@angular/core';

@Component({
    selector: 'app-spinner-card',
    imports: [],
  standalone: true,
    templateUrl: './spinner-card.html',
    styleUrl: './spinner-card.css',
})

export class SpinnerCard {

    isLoading = input.required<boolean>();

}
