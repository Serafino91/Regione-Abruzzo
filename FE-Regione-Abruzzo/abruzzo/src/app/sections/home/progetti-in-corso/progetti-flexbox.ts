import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ProjectCard } from './components/project-card/project-card';

@Component({
  selector: 'app-progetti-flexbox',
  imports: [ProjectCard],
  templateUrl: './progetti-flexbox.html',
  styleUrl: './progetti-flexbox.css',
})
export class ProgettiFlexbox {

progetti = [
  {
    id:1,
    titolo: 'Progetto 1',
    descrizione: 'Descrizione progetto 1',
    servizi: 'Web Design',
    stato: 'In corso'
  },
  {
    id:2,
    titolo: 'Progetto 2',
    descrizione: 'Descrizione progetto 2',
    servizi: 'Sviluppo',
    stato: 'Completato'
  },
  {
    id:3,
    titolo: 'Progetto 3',
    descrizione: 'Descrizione progetto 3',
    servizi: 'SEO',
    stato: 'In attesa'
  }
];

}
