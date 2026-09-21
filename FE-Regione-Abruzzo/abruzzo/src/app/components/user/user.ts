import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../model/user.model';
import { AppModal } from '../app-modal/app-modal';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [AppModal, ReactiveFormsModule],
  standalone: true,
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  currentUrl = '';
  user: UserModel | undefined;
  showProfiliModal = false;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
  ) {
    this.currentUrl = this.router.url;
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.name = user.name;
      this.role = user.role;
    });
  }

  name: string = 'user';
  role: string = 'user';
  profiloForm: FormGroup = new FormGroup({
    profilo: new FormControl('', Validators.required),
  });

  cambiaProfilo() {
    const selected = this.profiloForm.value.profilo;

    const nameMap: Record<string, string> = {
      profilo1: 'profilo 1',
      profilo2: 'profilo 2',
      user: 'user'
    };

    const roleMap: Record<string, string> = {
      profilo1: 'delegato',
      profilo2: 'delegato',
      user: 'admin'
    };

    const currentUser = this.userService.getUser();

    this.userService.setUser({
      ...currentUser,
      name: nameMap[selected] ?? 'user',
      role: roleMap[selected] ?? 'user',
      isAdmin: selected === 'user',
    });

    this.showProfiliModal = false;
  }
}
