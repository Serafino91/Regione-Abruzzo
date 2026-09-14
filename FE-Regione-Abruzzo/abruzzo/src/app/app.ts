import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { AlertExceptions } from './components/alert-exceptions/alert-exceptions';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.html', 
  styleUrls: ['./app.css'],
  imports: [RouterOutlet, Header, Footer, AlertExceptions],
})

export class App {

}
