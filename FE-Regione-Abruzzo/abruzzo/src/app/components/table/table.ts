import { Component, Input, OnInit, OnChanges, SimpleChanges, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  class?: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NgTemplateOutlet],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() defaultSortColumn: string = '';
  @Input() defaultSortDir: 'asc' | 'desc' = 'asc';

  @ContentChild('cellTemplate') cellTemplate!: TemplateRef<any>;

  // Variabili di Paginazione e Ordinamento
  currentPage: number = 1;
  pageSize: number = 10;
  sortColumn: string = '';
  sortDir: 'asc' | 'desc' = 'asc';
  
  paginatedData: any[] = [];

  ngOnInit() {
    this.sortColumn = this.defaultSortColumn;
    this.sortDir = this.defaultSortDir;
    this.updateTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateTable();
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize) || 1;
  }

  updateTable() {
    let processedData = [...this.data];

    // 1. Logica di Ordinamento (Opzionale)
    if (this.sortColumn) {
      processedData.sort((a, b) => {
        const valA = this.getNestedValue(a, this.sortColumn);
        const valB = this.getNestedValue(b, this.sortColumn);
        if (valA < valB) return this.sortDir === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // 2. Logica di Paginazione
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = processedData.slice(startIndex, startIndex + this.pageSize);
  }

  // Azioni dei pulsanti
  onPageSizeChange(newSize: number) {
    this.pageSize = Number(newSize);
    this.currentPage = 1; // Resetta alla prima pagina
    this.updateTable();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateTable();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateTable();
    }
  }

  sort(key: string) {
    const column = this.columns.find(c => c.key === key);
    if (!column || column.sortable === false) return;

    if (this.sortColumn === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = key;
      this.sortDir = 'asc';
    }
    this.updateTable();
  }

  getNestedValue(row: any, key: string): any {
    if (!key) return '';
    return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
  }
}