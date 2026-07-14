import { Component, Input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ServizioModel } from '../../model/servizioModel';
import { ProgettoDetailCard } from '../progetto-detail-card/progetto-detail-card';

@Component({
  selector: 'app-servizi-accordion',
  standalone: true,
  imports: [ProgettoDetailCard, UpperCasePipe],
  templateUrl: './servizi-accordion.html',
  styleUrl: './servizi-accordion.css',
})
export class ServiziAccordion {
  @Input() servizi: ServizioModel[] = [];

  expandedIndex: number | null = null;

  toggle(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex === index;
  }

  iconForType(type: string): string {
    const t = type?.toLowerCase() ?? '';
    if (t.includes('storage') || t.includes('disco') || t.includes('backup')) {
      return 'it-database';
    }
    if (t.includes('rete') || t.includes('vlan') || t.includes('network')) {
      return 'it-share';
    }
    return 'it-box';
  }
}
