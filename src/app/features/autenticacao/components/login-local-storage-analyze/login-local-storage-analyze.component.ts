import {
  afterNextRender,
  Component,
  inject
} from '@angular/core';

import {
  ActivatedRoute, Router
} from '@angular/router';

import {
  AutenticacaoHelper
} from '../../helper';

import {
  AutenticacaoStore
} from 'app/features';

@Component({
  selector: 'app-login-local-storage-analyze',
  imports: [],
  templateUrl: './login-local-storage-analyze.component.html',
  styleUrl: './login-local-storage-analyze.component.scss'
})
export class LoginLocalStorageAnalyzeComponent {
  store = inject(AutenticacaoStore);
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    afterNextRender(() => {
      this.setupCheckAuthenticationAndRedirect();
    });
  }

  setupCheckAuthenticationAndRedirect() {
    let token = localStorage.getItem('token');
    if (token)
      this.setupTokenValid(token);
    else {
      this
        .router
        .navigate(['login'], {
          queryParams: { route: this.getUrl() }
        });
    }
  }

  setupTokenValid(token: string) {
    if (AutenticacaoHelper.getTokenIsValid(token)) {
      this.store.setAutenticacao(token);
      this.router.navigate(['loading'], {
        queryParams: { route: this.getUrl() }
      });
    } else {
      this.router.navigate(['login'], {
        queryParams: { route: this.getUrl() }
      });
    }
  }

  getUrl(): string {
    let route = this
      .activatedRoute
      .snapshot
      .queryParamMap
      .getAll("route");

    if (!route)
      return "/home";

    return route.join('/');
  }
}
