import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SideBarUiComponent } from './core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    SideBarUiComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {

  @ViewChild('sidebar') sidebar: SideBarUiComponent | undefined;

  router = inject(Router);

  loginPage = false;
  loadingPage = false;
  semAutorizacao = false;
  pageBase = false;

  eventos = new Subscription();

  ngOnInit() {
    this.eventos = this.router.events.subscribe(() => {
      this.loginPage = this.router.url.toLowerCase().includes('/login');
      this.loadingPage = this.router.url.toLowerCase().includes('/loading');
      this.semAutorizacao = this.router.url.toLowerCase().includes('/usuario-nao-autorizado');
      this.setPageBase();
    });
  }

  ngOnDestroy() {
    this.eventos.unsubscribe();
  }

  setPageBase() {
    this.pageBase = false;

    if (this.router.url.toLowerCase() == "/")
      this.pageBase = true;

    if (this.router.url.toLowerCase().startsWith('/local-storage-analyze'))
      this.pageBase = true;
  }

  get showSideBar(): boolean {
    if (this.loginPage)
      return false;
    if (this.loadingPage)
      return false;
    if (this.semAutorizacao)
      return false;
    if (this.pageBase)
      return false;
    return true;
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }
}
