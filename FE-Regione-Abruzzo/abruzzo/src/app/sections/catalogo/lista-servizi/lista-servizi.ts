import { Component, Input } from '@angular/core';
import { ServizioModel } from '../../../model/servizioModel';
import { ServizioCard } from '../../../components/servizio-card/servizio-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-servizi',
  imports: [ServizioCard, FormsModule],
  standalone: true,
  templateUrl: './lista-servizi.html',
  styleUrl: './lista-servizi.css',
})

export class ListaServizi {

  @Input() servizi!: ServizioModel[];

  pageSize = 6;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.servizi.length / this.pageSize);
  }

  get paginatedServizi() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.servizi.slice(start, start + this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onPageSizeChange(size: number): void {
    this.pageSize = Number(size);
    this.currentPage = 1;
  }

}
