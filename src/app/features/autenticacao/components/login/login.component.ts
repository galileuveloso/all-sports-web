import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoStore } from 'app/features';


@Component({
  selector: 'app-login.component',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  autenticacaoStore = inject(AutenticacaoStore);

  mostrarSenha = false;
  mensagemErro = '';

  form = new FormGroup({
    login: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router
  ) {
    effect(() => {
      if (this.autenticacaoStore.isLoadingFailure()) {
        this.mensagemErro = "Usuário ou senha incorretos.";
        this.form.get('login')?.setValue('');
        this.form.get('senha')?.setValue('');
      }
    });
  }

  toggleSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this
      .autenticacaoStore
      .autenticaUsuario({
        login: this.form.get('login')?.value,
        senha: this.form.get('senha')?.value
      });
  }
}
