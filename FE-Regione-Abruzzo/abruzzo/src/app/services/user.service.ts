import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../model/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userSubject = new BehaviorSubject<UserModel>({
    name: '',
    role: '',
    isLoggedIn: false,
  });

  user$ = this.userSubject.asObservable();

  setUser(user: UserModel): void {
    this.userSubject.next(user);
  }

  getUser(): UserModel {
    return this.userSubject.value;
  }
}
