import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  UsuarioStore
} from 'app/features/usuario';

@Component({
  selector: 'app-loading.component',
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit {

  message = 'Só um momento, estamos ajustando tudo para você.';
  progress = 0;
  delay = 50;

  usuarioStore = inject(UsuarioStore);

  readonly isLoadingUsuario = this.usuarioStore.isLoading;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.setLoadingPercentage();
    this.cdr.detectChanges();
  }

  getLoadingPercentage(): number {
    if (this.isLoadingUsuario()) {
      const remaining = 100 - this.progress;
      return this.progress + Math.max(remaining * 0.02, 0.1);
    }

    return Math.min(this.progress + 2, 100);
  }

  setLoadingPercentage() {
    if (this.progress < 100) {

      this.progress = this.getLoadingPercentage();

      // trava em 99 enquanto carrega
      if (this.isLoadingUsuario()) {
        this.progress = Math.min(this.progress, 99);
      }

      this.cdr.detectChanges();

      setTimeout(() => this.setLoadingPercentage(), this.delay);
      return;
    }

    this.iniciarAcesso();
  }

  iniciarAcesso() {
    setTimeout(() => {
      this.router.navigateByUrl(this.getUrl());
    }, 1500);
  }

  getUrl(): string {
    return this.resolveRoute(
      this
        .activatedRoute
        .snapshot
        .queryParamMap
        .getAll("route")
        .join('/')
    );
  }

  resolveRoute(queryRoute: string | null): string {
    if (!queryRoute)
      return "/home";

    try {
      let url = new URL(queryRoute, window.location.origin);
      let route = url.pathname;
      if (route == "/loading") {
        const nextRoute = url.searchParams.get("route");
        return this.resolveRoute(nextRoute);
      }

      return route;
    } catch (error: any) {
      return "/home";
    }
  }
} 
