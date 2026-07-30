export type StatoRichiesta = 'in_elaborazione' | 'in_valutazione' | 'rifiutata' | 'completata' | 'incompleta';

export type StatoTicket = 'aperto' | 'in_lavorazione' | 'chiuso';

export interface StatoConfigElement {
  label: string;
  colorBorder: string;
  colorBg: string;
  colorText: string;
}

export const STATO_CONFIG: Record<StatoRichiesta, StatoConfigElement> = {
  in_elaborazione: {
    label: 'In elaborazione',
    colorBorder: '#0066CC',
    colorBg: '#e8f1fb',
    colorText: '#0066CC',
  },
  in_valutazione: {
    label: 'In valutazione',
    colorBorder: '#fd7e14',
    colorBg: '#fff4e8',
    colorText: '#c45b00',
  },
  rifiutata: {
    label: 'Rifiutata',
    colorBorder: '#d9364f',
    colorBg: '#fdedf0',
    colorText: '#d9364f',
  },
  completata: {
    label: 'Completata',
    colorBorder: '#1a8a5a',
    colorBg: '#e6f5ef',
    colorText: '#1a8a5a',
  },
  incompleta: {
    label: 'Incompleta',
    colorBorder: '#6c757d',
    colorBg: '#f0f1f2',
    colorText: '#4a5056',
  },
};

export const STATO_TICKET_CONFIG: Record<StatoTicket, StatoConfigElement> = {
  aperto: {
    label: 'Aperto',
    colorBorder: '#0066CC',
    colorBg: '#e8f1fb',
    colorText: '#0066CC',
  },
  in_lavorazione: {
    label: 'In lavorazione',
    colorBorder: '#fd7e14',
    colorBg: '#fff4e8',
    colorText: '#c45b00',
  },
  chiuso: {
    label: 'Chiuso',
    colorBorder: '#6c757d',
    colorBg: '#f0f1f2',
    colorText: '#4a5056',
  },
};