import { Component } from '@angular/core';

@Component({
  selector: 'app-richiedente-card',
  imports: [],
  standalone: true,
  templateUrl: './richiedente-card.html',
  styleUrl: './richiedente-card.css',
})
export class RichiedenteCard {
  email: string = 'gianni.pippo@gmail.com';
  pec: string = 'gianni.pippo@gmail.com';
  telefono: string = '335763856';
}
