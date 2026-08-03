import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

const TOKEN_KEY = 'auth_token';
const ROLES_KEY = 'auth_roles';
const ACTIVE_ROLE_KEY = 'auth_active_role';

export interface LoginRequest {
  fiscalCode: string;
  email: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private activeRoleSubject: BehaviorSubject<string | null>;
  public activeRole$: Observable<string | null>;

  constructor() {
    // Survives page refresh within the same browser tab
    const storedActiveRole = this.isBrowser
      ? sessionStorage.getItem(ACTIVE_ROLE_KEY)
      : null;

    this.activeRoleSubject = new BehaviorSubject<string | null>(storedActiveRole);
    this.activeRole$ = this.activeRoleSubject.asObservable();
  }

  // --- HTTP Call to Backend ---

  authenticate(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(tap((response) => this.login(response)));
  }

  // --- Login / Logout ---

  private login(response: LoginResponse): void {
    if (!response || !response.token) {
      console.error('Invalid LoginResponse received from backend:', response);
      return;
    }

    if (this.isBrowser) {
      sessionStorage.setItem(TOKEN_KEY, response.token);
      sessionStorage.setItem(ROLES_KEY, JSON.stringify(response.roles || []));
    }

    // Determine default role
    const currentActive = this.getActiveRole();
    const defaultRole =
      currentActive && response.roles.includes(currentActive)
        ? currentActive
        : response.roles[0] ?? null;

    // Directly set role state during login without triggering guard check
    if (this.isBrowser && defaultRole) {
      sessionStorage.setItem(ACTIVE_ROLE_KEY, defaultRole);
    }
    this.activeRoleSubject.next(defaultRole);
  }

  logout(): void {
    if (this.isBrowser) {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(ROLES_KEY);
      sessionStorage.removeItem(ACTIVE_ROLE_KEY);
    }
    this.activeRoleSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // --- Token ---

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(TOKEN_KEY);
  }

  // --- Available Roles ---

  getAvailableRoles(): string[] {
    if (!this.isBrowser) return [];
    const raw = sessionStorage.getItem(ROLES_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  // --- Active Role ---

  getActiveRole(): string | null {
    return this.activeRoleSubject.getValue();
  }

  setActiveRole(role: string | null): void {
    const available = this.getAvailableRoles();

    if (role && available.length > 0 && !available.includes(role)) {
      console.warn(`Role "${role}" is not present among available user roles.`);
      return;
    }

    if (this.isBrowser) {
      if (role) {
        sessionStorage.setItem(ACTIVE_ROLE_KEY, role);
      } else {
        sessionStorage.removeItem(ACTIVE_ROLE_KEY);
      }
    }
    this.activeRoleSubject.next(role);
  }
}