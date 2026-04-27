import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { TelefonePipe } from 'app/core';
import { EstabelecimentoModel } from 'app/domain';

import {
  EstabelecimentoInserirModalComponent,
  EstabelecimentoStore
} from 'app/features';

@Component({
  selector: 'app-estabelecimento-list.component',
  imports: [
    CommonModule,
    EstabelecimentoInserirModalComponent,
    TelefonePipe
  ],
  templateUrl: './estabelecimento-list.component.html',
  styleUrl: './estabelecimento-list.component.scss',
})
export class EstabelecimentoListComponent {

  @ViewChild(EstabelecimentoInserirModalComponent) inserirModal: EstabelecimentoInserirModalComponent | undefined;

  estabelecimentoStore = inject(EstabelecimentoStore);

  estabelecimentoMany = this.estabelecimentoStore.getItens;

  novo() {
    this.inserirModal?.abrirModal();
  }

  editar(estabelecimento: EstabelecimentoModel) {
    this.inserirModal?.abrirModal(estabelecimento)
  }
}
