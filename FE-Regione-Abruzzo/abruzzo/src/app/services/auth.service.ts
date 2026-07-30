import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment'; // adatta il path al tuo progetto

const TOKEN_KEY = 'auth_token';
const ROLES_KEY = 'auth_roles';
const ACTIVE_ROLE_KEY = 'auth_active_role';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  roles: string[]; // es. ['ROLE_USER', 'ROLE_DELEGATE_VIEWER']
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private activeRoleSubject: BehaviorSubject<string | null>;
  public activeRole$: Observable<string | null>;

  constructor() {
    const storedActiveRole = localStorage.getItem(ACTIVE_ROLE_KEY);
    this.activeRoleSubject = new BehaviorSubject<string | null>(storedActiveRole);
    this.activeRole$ = this.activeRoleSubject.asObservable();
  }

  // --- Chiamata HTTP al backend ---

  authenticate(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(tap(response => this.login(response)));
  }

  // --- Login / Logout ---

  private login(response: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(ROLES_KEY, JSON.stringify(response.roles));

    // Se non c'è un ruolo attivo salvato, o non è più tra quelli disponibili,
    // imposta di default il primo ruolo ricevuto dal backend.
    const currentActive = this.getActiveRole();
    const defaultRole =
      currentActive && response.roles.includes(currentActive)
        ? currentActive
        : response.roles[0] ?? null;

    this.setActiveRole(defaultRole);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLES_KEY);
    localStorage.removeItem(ACTIVE_ROLE_KEY);
    this.activeRoleSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // --- Token ---

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  // --- Ruoli disponibili ---

  getAvailableRoles(): string[] {
    const raw = localStorage.getItem(ROLES_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  // --- Ruolo attivo (dropdown) ---

  getActiveRole(): string | null {
    if (this.activeRoleSubject.getValue() == 'ROLE_ADMIN') {
      return this.activeRoleSubject.getValue();
    } else {
      return 'ROLE_USER';
    }
  }

  setActiveRole(role: string | null): void {
    if (role && !this.getAvailableRoles().includes(role)) {
      console.warn(`Ruolo "${role}" non presente tra i ruoli disponibili per l'utente.`);
      return;
    }

    if (role) {
      localStorage.setItem(ACTIVE_ROLE_KEY, role);
    } else {
      localStorage.removeItem(ACTIVE_ROLE_KEY);
    }

    this.activeRoleSubject.next(role);
  }
}
