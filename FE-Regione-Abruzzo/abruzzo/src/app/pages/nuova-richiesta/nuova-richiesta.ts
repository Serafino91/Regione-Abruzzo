import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormArray, FormControl, Validators } from '@angular/forms';
import { ScegliProgetto } from '../../sections/nuova-richiesta/scegli-progetto/scegli-progetto';
import { SelezionaServizio } from '../../sections/nuova-richiesta/seleziona-servizio/seleziona-servizio';
import { ControllaInvia } from '../../sections/nuova-richiesta/controlla-invia/controlla-invia';
import { SectionFooter } from '../../sections/nuova-richiesta/section-footer/section-footer';
import { WizardBar } from '../../components/wizard-bar/wizard-bar';
import { WizardLabelItem } from '../../constants/WizardLabelItem';
import { RichiesteService } from '../../services/richieste.service';
import { ProgettiService } from '../../services/progetti.service';
import { Router } from '@angular/router';
import { ProgettoModel } from '../../model/progetto.model';
import { RichiestaSafeModel, RichiestaProjectDto } from '../../model/richiestaSafeModel';
import { PageHeader } from '../../components/page-header/page-header';

@Component({
  selector: 'app-nuova-richiesta',
  imports: [
    ScegliProgetto,
    SelezionaServizio,
    ControllaInvia,
    SectionFooter,
    ReactiveFormsModule,
    WizardBar,
    PageHeader,
  ],
  templateUrl: './nuova-richiesta.html',
  styleUrl: './nuova-richiesta.css',
  standalone: true,
})
class NuovaRichiesta {

  currentStep = 1;
  url = '';
  showModal = false;
  showModalSuccess = false;

  constructor(
    private richiesteService: RichiesteService,
    private progettiService: ProgettiService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  richiestaForm = new FormGroup({
    progettoForm: new FormGroup({}),
    servizioForm: new FormGroup({
      servizi: new FormArray([]),
    }),
  });

  noteForm = new FormGroup({
    note: new FormControl('', [Validators.maxLength(500)]),
  });

  wizardItems: WizardLabelItem[] = [
    { id: 1, label: '01.Scegli il progetto', icon: 'it-list' },
    { id: 2, label: '02.Scegli servizio e compila il form', icon: 'it-software' },
    { id: 3, label: '03.Controlla ed invia', icon: 'it-check-circle' },
  ];

  nextStep() {
    if (!this.canGoNext()) {
      return;
    }

    if (this.currentStep === 1 && this.nuovaRichiesta) {
      const nome = this.richiestaForm.get('progettoForm.progetto.nome')?.value;
      const link = this.richiestaForm.get('progettoForm.progetto.link')?.value;
      if (nome && link) {
        this.progettiService.checkProgettoEsiste(nome, link).subscribe({
          next: (exists: boolean) => {
            this.progettoEsistenteError = exists;
            if (!exists) {
              this.currentStep++;
            }
            this.cdr.detectChanges();
          },
          error: () => {
            this.progettoEsistenteError = false;
            this.currentStep++;
            this.cdr.detectChanges();
          },
        });
        return;
      }
    }
    this.progettoEsistenteError = false;
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  private getCurrentGroup(): FormGroup {
    switch (this.currentStep) {
      case 1:
        return this.richiestaForm.get('progettoForm') as FormGroup;
      case 2:
        return this.richiestaForm.get('servizioForm') as FormGroup;
      default:
        throw new Error('Step non valido');
    }
  }

  canGoNext(): boolean {
    const servizi = this.richiestaForm.get('servizioForm.servizi') as FormArray;

    switch (this.currentStep) {
      case 1:
        const gruppoCorrente = this.getCurrentGroup();
        if (gruppoCorrente.invalid) {
          return false;
        } else return true;
      case 2:
        return servizi.length > 0;
      default:
        return true;
    }
  }

  nuovaRichiesta = false;
  isInviando = false;
  progettoEsistenteError = false;

  onNuovaRichiesta(flag: boolean) {
    this.nuovaRichiesta = flag;
  }

  inviaRichiesta(): void {
    if (this.isInviando) return;
    this.isInviando = true;
    const progettoForm = this.richiestaForm.get('progettoForm')!.value as any;
    const servizi = (this.richiestaForm.get('servizioForm.servizi') as FormArray).value;
    const primoServizio = servizi[0];
    const categoria = primoServizio
      ? { id: Number(primoServizio.categoriaId), name: '' }
      : undefined;

    let project: RichiestaProjectDto;
    if (this.nuovaRichiesta) {
      const p = progettoForm['progetto'];
      project = {
        id: 0,
        name: p.nome,
        destinationLink: p.link,
        description: p.descrizione,
        createAt: new Date().toISOString(),
      };
    } else {
      const p: ProgettoModel = progettoForm['selezione'];
      project = {
        id: p.idProgetto,
        name: p.nome,
        destinationLink: p.destinationLink,
        description: p.description,
        createAt: p.dataCreazione,
        updateAt: p.dataUltimaModifica,
      };
    }


    const richiesta: RichiestaSafeModel = {
      requestId: '',
      state: 'In elaborazione',
      project,
      service: null!,
      services: servizi.map((s: any) => ({
        id: s.servizioId,
        type: s.type,
        item: s.item,
        base: false,
        optional: false,
        quantity: String(s.unit),
        durationMonths: null,
        params: Object.entries(s.params ?? {}).map(([name, paramObj]: [string, any]) => ({
          id: paramObj.id,
          name,
          value: paramObj.value
        }))
      })),
      category: categoria,
      sendFrom: progettoForm['dataDa'] ? new Date(progettoForm['dataDa']).toISOString() : '',
      sendTo: progettoForm['dataA'] ? new Date(progettoForm['dataA']).toISOString() : '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      note: this.noteForm.controls.note.value ?? '',
    };

    this.richiesteService.createRichiesta(richiesta).subscribe({
      next: () => {
        this.isInviando = false;
        this.showModal = false;
        this.showModalSuccess = true;
        // this.cdr.detectChanges();
        this.goToHome();
      },
      error: (err) => {
        this.isInviando = false;
        console.error("Errore durante l'invio della richiesta:", err);
        this.showModal = false;
        this.cdr.detectChanges();
      },
    });
  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

  debugForm() {
    console.log(this.richiestaForm.value);
  }

  goBack(): void {
    this.router.navigateByUrl("home/richieste");
  }
}

export default NuovaRichiesta;
