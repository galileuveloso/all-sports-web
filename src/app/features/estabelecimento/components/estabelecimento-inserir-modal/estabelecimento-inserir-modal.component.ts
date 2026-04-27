import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
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
  EstabelecimentoStore,
  UsuarioStore
} from 'app/features';

@Component({
  selector: 'app-estabelecimento-inserir-modal',
  imports: [
    ModalUiComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TelefoneMask
  ],
  templateUrl: './estabelecimento-inserir-modal.component.html',
  styleUrl: './estabelecimento-inserir-modal.component.scss',
})
export class EstabelecimentoInserirModalComponent implements OnInit {

  estabelecimentoStore = inject(EstabelecimentoStore);
  usuarioStore = inject(UsuarioStore);

  isOpen = false;
  usuarioMany = this.usuarioStore.getUsuarioGestorQuadraMany;
  gestoresSelecionados: any[] = [];
  usuarioSelecionadoId: string | null = null;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      modalidades: ['', Validators.required],
      ativo: [true],
      gestores: [[], Validators.required]
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
    this.gestoresSelecionados = [];
    this.usuarioSelecionadoId = null;
  }

  onSubmit(): void {
    this.atualizarFormGestores();

    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const payload = this.form?.getRawValue();

    let estabelecimento = EstabelecimentoModel.create({
      ...payload,
      idUsuarioGestorMany: payload.gestores
    });

    this.estabelecimentoStore.inserirEstabelecimento({ estabelecimento: estabelecimento });

    this.fecharModal();
  }

  // helpers para deixar o template limpo
  hasError(field: string, error = 'required'): boolean {
    const ctrl = this.form?.get(field);
    return !!(ctrl?.hasError(error) && (ctrl.touched || ctrl.dirty));
  }

  adicionarGestor(): void {
    if (!this.usuarioSelecionadoId) return;

    const usuario = this.usuarioMany().find(item => item.id == this.usuarioSelecionadoId);

    if (!usuario) return;

    // evita duplicado
    const jaExiste = this.gestoresSelecionados.some(g => g.id === usuario.id);
    if (jaExiste) return;

    this.gestoresSelecionados.push(usuario);

    this.usuarioSelecionadoId = null;

    this.atualizarFormGestores();
  }

  removerGestor(id: number): void {
    this.gestoresSelecionados = this.gestoresSelecionados.filter(g => g.id !== id);
    this.atualizarFormGestores();
  }

  atualizarFormGestores(): void {
    const ids = this.gestoresSelecionados.map(g => g.id);
    this.form.get('gestores')?.setValue(ids);
  }
}
