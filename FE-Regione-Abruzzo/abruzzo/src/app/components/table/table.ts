import { Component, Input, OnChanges, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  class?: string;
}

export type SortDir = 'asc' | 'desc';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.html', // Corretto senza .component
  styleUrl: './table.css'       // Corretto senza .component
})
export class TableComponent<T = any> implements OnChanges {
  @Input() data: T[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() defaultSortColumn: string = '';
  @Input() defaultSortDir: SortDir = 'asc';
  @Input() itemsPerPage = 10;
  @Input() noDataMessage = 'Nessun dato trovato.';

  @ContentChild('cellTemplate') cellTemplate!: TemplateRef<any>;

  currentPage = 1;
  sortColumn: string = '';
  sortDir: SortDir = 'asc';
  perPageOptions = [5, 10, 20, 50];

  ngOnChanges(): void {
    this.currentPage = 1;
    if (!this.sortColumn && this.defaultSortColumn) {
      this.sortColumn = this.defaultSortColumn;
      this.sortDir = this.defaultSortDir;
    }
  }

  getNestedValue(obj: any, path: string): any {
    if (!path) return '';
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  get sorted(): T[] {
    if (!this.sortColumn) return this.data;

    return [...this.data].sort((a, b) => {
      const va = String(this.getNestedValue(a, this.sortColumn) ?? '');
      const vb = String(this.getNestedValue(b, this.sortColumn) ?? '');
      
      return this.sortDir === 'asc' 
        ? va.localeCompare(vb, undefined, { numeric: true, sensitivity: 'base' }) 
        : vb.localeCompare(va, undefined, { numeric: true, sensitivity: 'base' });
    });
  }

  get totalResults(): number {
    return this.data.length;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalResults / this.itemsPerPage));
  }

  get paginated(): T[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.sorted.slice(start, start + this.itemsPerPage);
  }

  sort(col: TableColumn): void {
    if (!col.sortable) return;
    
    if (this.sortColumn === col.key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col.key;
      this.sortDir = 'asc';
    }
  }

  onPerPageChange(): void {
    this.currentPage = 1;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
}