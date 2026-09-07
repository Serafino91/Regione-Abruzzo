import { Component } from '@angular/core';
import {
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    ReactiveFormsModule
} from '@angular/forms';
import { PageHeader } from '../../components/page-header/page-header';
import { AppModal } from '../../components/app-modal/app-modal';
import { Router } from '@angular/router';
import { File } from '../../model/file.model';
import { TabellaFileIncident } from './tabella-file-incident/tabella-file-incident';

@Component({
    selector: 'app-nuovo-incident',
    imports: [
        FormsModule, 
        ReactiveFormsModule, 
        PageHeader, 
        AppModal,
        TabellaFileIncident
    ],
    templateUrl: './nuovo-incident.html',
    styleUrl: './nuovo-incident.css',
    standalone: true,
})

export class NuovoIncident {

    showModal = false;
    showModalInvio = false;

    files: File[] = [];

    constructor(private router: Router) { }

    readonly maxNoteLength: number = 500;
    incidentForm = new FormGroup({
        categoria: new FormControl('', Validators.required),
        sottocategoria: new FormControl('', Validators.required),
        idProgetto: new FormControl('', Validators.required),
        idServizio: new FormControl('', Validators.required),
        descrizione: new FormControl('', [Validators.maxLength(this.maxNoteLength)]),
        sede: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        telefono: new FormControl('', Validators.required),
        files: new FormControl<File[]>([], Validators.nullValidator),
    });

    onFileSelected(event: Event): void {
        if (event) {
            const inputFile = event.target as HTMLInputElement;

            if (inputFile && inputFile.files && inputFile.files.length > 0) {

                const fileId = this.files.length + 1;
                const name = inputFile.files[0].name;
                const size = inputFile.files[0].size;

                this.files = [...this.files, { fileId: fileId, file: inputFile.files[0], name: name, size: size }];

                this.incidentForm.get('files')?.setValue(this.files);

            }
        }
    }

    onDeleteFile(fileId: number): void {
        let filesFiltered = this.files.filter(f => f.fileId !== fileId);

        if (filesFiltered.length > 0) {
            filesFiltered = filesFiltered.map((f, index) => ({ ...f, fileId: index + 1 }));
        }

        this.files = [...filesFiltered];

        this.incidentForm.get('files')?.setValue(this.files);
    }

    inviaIncident() {
        this.showModal = false;
        this.showModalInvio = true;
    }

    goToHome(): void {
        this.router.navigate(['home']);
    }

    vediDettaglio() { }
}