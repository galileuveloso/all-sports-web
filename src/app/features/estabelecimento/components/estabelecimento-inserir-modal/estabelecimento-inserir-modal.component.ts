import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ModalUiComponent,
  TelefoneMask
} from 'app/core';

import {
  EstabelecimentoModel
} from 'app/domain';

import {
  EstabelecimentoStore
} from 'app/features';

@Component({
  selector: 'app-estabelecimento-inserir-modal',
  imports: [
    ModalUiComponent,
    ReactiveFormsModule,
    CommonModule,
    TelefoneMask
  ],
  templateUrl: './estabelecimento-inserir-modal.component.html',
  styleUrl: './estabelecimento-inserir-modal.component.scss',
})
export class EstabelecimentoInserirModalComponent implements OnInit {

  estabelecimentoStore = inject(EstabelecimentoStore);

  isOpen = false;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      modalidades: ['', Validators.required],
      ativo: [true],
    });
  }

  ngOnInit(): void {

  }

  abrirModal() {
    this.isOpen = true;
  }

  fecharModal(): void {
    this.isOpen = false;
    this.form.reset({ ativo: true });
  }

  onSubmit(): void {
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form?.getRawValue();

    let estabelecimento = EstabelecimentoModel.create(payload);

    this.estabelecimentoStore.inserirEstabelecimento({ estabelecimento: estabelecimento });

    this.fecharModal();
  }

  // helpers para deixar o template limpo
  hasError(field: string, error = 'required'): boolean {
    const ctrl = this.form?.get(field);
    return !!(ctrl?.hasError(error) && ctrl.touched);
  }
}
