import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.html', 
  styleUrls: ['./app.css'],
  imports: [RouterOutlet, Header, Footer],
})

export class App {

}
