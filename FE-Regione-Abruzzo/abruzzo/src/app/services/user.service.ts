// user.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../model/user.model';

const STORAGE_KEY = 'mockUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isBrowser: boolean;
  private userSubject: BehaviorSubject<UserModel>;

  user$: ReturnType<UserService['userSubject']['asObservable']>;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.userSubject = new BehaviorSubject<UserModel>(this.loadUser());
    this.user$ = this.userSubject.asObservable();
  }

  private loadUser(): UserModel {
    if (this.isBrowser) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return { name: 'user', role: 'user', isLoggedIn: false };
  }

  setUser(user: UserModel): void {
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
    this.userSubject.next(user);
  }

  getUser(): UserModel {
    return this.userSubject.value;
  }
}
