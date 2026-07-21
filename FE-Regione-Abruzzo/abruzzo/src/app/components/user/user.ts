import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../model/user.model';

@Component({
  selector: 'app-user',
  imports: [],
  standalone: true,
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  currentUrl = '';
  user: UserModel | undefined;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
  ) {
    this.currentUrl = this.router.url;

    /*
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      console.log('URL:', this.router.url);
      this.currentUrl = this.router.url;
      this.cdr.detectChanges();
    });
  }

  get isLoginPage(): boolean {
    return this.currentUrl === '/login';
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }
  */
  }
  name: string = 'admin';
  role: string = 'admin';
}
