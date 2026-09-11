export interface AlertMessage {
    type: 'error' | 'warning' | 'success' | 'info';
    title: string;
    message: string;
}