import { Component, input } from '@angular/core';

@Component({
    selector: 'app-spinner-card',
    imports: [],
    templateUrl: './spinner-card.html',
    styleUrl: './spinner-card.css',
})

export class SpinnerCard {

    isLoading = input.required<boolean>();

}