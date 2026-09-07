// dropdown-trigger.directive.ts
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[appDropdownTrigger]',
  standalone: true,
  exportAs: 'appDropdownTrigger',
})
export class DropdownTriggerDirective implements OnDestroy {
  @Input('appDropdownTrigger') template!: TemplateRef<unknown>;
  @Input() appDropdownTriggerContext: unknown = null;


  private overlayRef: OverlayRef | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private overlay: Overlay,
    private vcr: ViewContainerRef,
  ) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.overlayRef ? this.close() : this.open();
  }

  open() {
    const positions: ConnectedPosition[] = [
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        offsetY: 8,
        panelClass: 'dropdown-caret-top', // menu SOTTO al bottone -> freccia punta IN SU
      },
      {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetY: -8,
        panelClass: 'dropdown-caret-bottom', // menu SOPRA al bottone -> freccia punta IN GIÙ
      },
    ];

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.el)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());

    const portal = new TemplatePortal(this.template, this.vcr, this.appDropdownTriggerContext);
    this.overlayRef.attach(portal);

    // chiude il menu quando si clicca un item al suo interno (link, bottone, ecc.)
    this.overlayRef.overlayElement.addEventListener('click', () => this.close());
  }

  close() {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  ngOnDestroy() {
    this.close();
  }
}
