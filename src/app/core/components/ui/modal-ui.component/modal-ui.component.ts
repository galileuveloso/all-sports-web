import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-modal-ui',
  imports: [CommonModule],
  templateUrl: './modal-ui.component.html',
  styleUrl: './modal-ui.component.scss',
})
export class ModalUiComponent implements OnChanges {

  constructor(private cdr: ChangeDetectorRef) { }

  /** Controla a visibilidade do modal */
  @Input() isOpen = false;

  /** Título exibido no header */
  @Input() title = '';

  /** Subtítulo opcional exibido abaixo do título */
  @Input() subtitle = '';

  /** Tamanho do painel: 'sm' | 'md' | 'lg' | 'xl' */
  @Input() size: ModalSize = 'md';

  /** Se false, esconde o botão X e impede fechar pelo backdrop */
  @Input() closable = true;

  /** Emite quando o modal deve ser fechado */
  @Output() closed = new EventEmitter<void>();

  /** Controla a animação de entrada/saída */
  visible = false;
  animating = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  private open(): void {
    this.visible = true;
    requestAnimationFrame(() => {
      this.animating = true;
      document.body.style.overflow = 'hidden';
      this.cdr.markForCheck();
    });
  }

  private close(): void {
    this.animating = false;
    setTimeout(() => {
      this.visible = false;
      document.body.style.overflow = '';
    }, 200); // deve coincidir com a duração da transição CSS
  }

  onBackdropClick(): void {
    if (this.closable) {
      this.closed.emit();
    }
  }

  onPanelClick(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen && this.closable) {
      this.closed.emit();
    }
  }
}
