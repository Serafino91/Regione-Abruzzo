import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-iaa-s',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './form-iaa-s.html',
  styleUrl: './form-iaa-s.css',
})
export class FormIaaS {
  @Input({ required: true }) formGroup!: FormGroup;

  families: string[] = ['Linux', 'Windows', 'MacOS'];
  disc_type: string[] = ['HDD', 'SSD', 'NVMe'];
  network_type: string[] = ['NAT', 'Bridged', 'Private'];


  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (!this.formGroup.contains('nome')) {
      this.formGroup.addControl('nome', new FormControl('', Validators.required));
    }
    if (!this.formGroup.contains('descrizione')) {
      this.formGroup.addControl('descrizione', new FormControl(''));
    }
    if (!this.formGroup.contains('os')) {
      this.formGroup.addControl(
        'os',
        new FormGroup({
          family: new FormControl('', Validators.required),
          version: new FormControl('', Validators.required),
        }),
      );
    }
    if (!this.formGroup.contains('hardware')) {
      this.formGroup.addControl(
        'hardware',
        new FormGroup({
          vcpu: new FormControl('', Validators.required),
          ram_gb: new FormControl('', Validators.required),
          disks: new FormArray([]),
        }),
      );
    }
    if (!this.formGroup.contains('network_interfaces')) {
      this.formGroup.addControl('network_interfaces', new FormArray([]));
    }

    if (!this.formGroup.contains('status')) {
      this.formGroup.addControl('status', new FormControl('stopped'));
    }


    if (this.discsArray.length === 0) {
      this.aggiungiDisco();
    }
  }

  get discsArray(): FormArray {
    return this.formGroup.get('hardware.disks') as FormArray;
  }

  aggiungiDisco(): void {
    this.discsArray.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        size_gb: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
      }),
    );
  }

  rimuoviDisco(index: number): void {
    this.discsArray.removeAt(index);
  }

  get interfacciaArray(): FormArray {
    return this.formGroup.get('network_interfaces') as FormArray;
  }

  aggiungiInterfaccia(): void {
    this.interfacciaArray.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        network_type: new FormControl('', Validators.required),
        ip_address: new FormControl('', Validators.required),
      }),
    );
  }

  rimuoviInterfaccia(index: number): void {
    this.interfacciaArray.removeAt(index);
  }

  goBack(): void {
    this.router.navigateByUrl('home/catalogo');
  }


}
