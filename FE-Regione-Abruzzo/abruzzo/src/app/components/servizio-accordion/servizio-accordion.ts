import { Component, Input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ServizioModel } from '../../model/servizioModel';

@Component({
  selector: 'app-servizio-accordion',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './servizio-accordion.html',
  styleUrl: './servizio-accordion.css',
})
export class ServizioAccordion {

  @Input({ required: true }) servizio!: ServizioModel;
  expanded = false;

  toggle(): void {
    this.expanded = !this.expanded;
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
