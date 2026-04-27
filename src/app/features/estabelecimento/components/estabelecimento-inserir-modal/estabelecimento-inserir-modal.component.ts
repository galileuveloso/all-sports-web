import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

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
  EstabelecimentoModel,
  UsuarioModel
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

  estabelecimento: EstabelecimentoModel | null = null;
  usuarioMany = this.usuarioStore.getUsuarioGestorQuadraMany;
  gestoresSelecionados: UsuarioModel[] = [];
  usuarioSelecionadoId: string | null = null;

  isOpen = false;
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

  abrirModal(estabelecimento?: EstabelecimentoModel) {
    this.isOpen = true;

    if (estabelecimento) {
      this.estabelecimento = estabelecimento;

      this.form.patchValue({
        nome: estabelecimento.nome,
        telefone: estabelecimento.telefone,
        endereco: estabelecimento.endereco,
        modalidades: estabelecimento.modalidades,
        ativo: estabelecimento.ativo
      });

      this.gestoresSelecionados = this.usuarioMany()
        .filter(u => estabelecimento.idUsuarioGestorMany?.includes(u.id));

      this.atualizarFormGestores();
    } else {
      this.estabelecimento = null;
    }
  }

  fecharModal(): void {
    this.isOpen = false;
    this.estabelecimento = null;
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
      id: this.estabelecimento?.id,
      idUsuarioGestorMany: payload.gestores
    });

    if (this.isEdicao) {
      this.estabelecimentoStore.atualizarEstabelecimento({ estabelecimento });
    } else {
      this.estabelecimentoStore.inserirEstabelecimento({ estabelecimento });
    }

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

  removerGestor(id: string): void {
    this.gestoresSelecionados = this.gestoresSelecionados.filter(g => g.id !== id);
    this.atualizarFormGestores();
  }

  atualizarFormGestores(): void {
    const ids = this.gestoresSelecionados.map(g => g.id);
    this.form.get('gestores')?.setValue(ids);
  }

  get isEdicao(): boolean {
    return !!this.estabelecimento;
  }

  get title(): string {
    return this.isEdicao ? 'Editar estabelecimento' : 'Criar estabelecimento'
  }
}
