export type StatoRichiestaId = 1 | 2 | 3 | 4 | 5;

export interface StatoRichiestaInfo {
  readonly id: StatoRichiestaId;
  readonly label: string;
  readonly icon: string;
  readonly colorClass: string;
}

export const STATI_RICHIESTA: Record<StatoRichiestaId, StatoRichiestaInfo> = {
  1: { id: 1, label: 'In elaborazione', icon: 'it-unlocked', colorClass: 'icon-warning' } /*aperto*/,
  2: { id: 2, label: 'In valutazione', icon: 'it-refresh', colorClass: 'icon-info' } /*in lavorazione*/,
  3: { id: 3, label: 'Rifiutata', icon: 'it-close-circle', colorClass: 'icon-danger' },
  4: { id: 4, label: 'Completata', icon: 'it-locked', colorClass: 'icon-success' },
  5: { id: 5, label: 'Incompleta', icon: 'it-error', colorClass: 'icon-secondary' },
};

export function getStatoRichiesta(id: number): StatoRichiestaInfo | undefined {
  return STATI_RICHIESTA[id as StatoRichiestaId];
}
