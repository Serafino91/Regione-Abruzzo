import { Component } from '@angular/core';
import { Button } from '../../components/button/button';
import { Url } from '../../components/url/url';
import { FiltriServizi } from '../../sections/catalogo/filtri-servizi/filtri-servizi';
import { ListaServizi } from '../../sections/catalogo/lista-servizi/lista-servizi';


@Component({
  selector: 'app-catalogue',
  imports: [Url, FiltriServizi, ListaServizi],
  standalone: true,
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {}
