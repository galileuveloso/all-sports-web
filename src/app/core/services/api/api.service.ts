import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export abstract class ApiService<T> {
  url = '';
  private parameters = '';
  http = inject(HttpClient);

  constructor() {
  }

  get<F>(route: string): Observable<F> {
    return this.http.get<F>(`${this.url}/${route}`, this.buildHttpOptions());
  }

  getBy<F>(route: string, params: Map<string, any>): Observable<F> {
    return this.http.get<F>(`${this.url}/${route}${this.buildQueryParameter(params)}`, this.buildHttpOptions());
  }

  post<F>(route: string, payload: Object | null): Observable<F> {
    return this.http.post<F>(`${this.url}/${route}`, payload, this.buildHttpOptions());
  }

  postToken<F>(route: string, payload: Object | null, token: string): Observable<F> {
    return this.http.post<F>(`${this.url}/${route}`, payload, this.buildHttpOptionsToken(token));
  }

  put<F>(route: string, payload: Object | null): Observable<F> {
    return this.http.put<F>(`${this.url}/${route}`, payload, this.buildHttpOptions());
  }

  delete(route: string, id: string): Observable<any> {
    return this.http.delete(`${this.url}/${route}/${id}`, this.buildHttpOptions());
  }

  private buildQueryParameter = (params: Map<string, any>) => {
    if (!params)
      return "";

    this.parameters = '';
    params.forEach((value, key) => {
      if (Array.isArray(value)) {
        for (let item of value)
          this.parameters += `${key.toLowerCase()}=${item}&`;
      }
      else {
        this.parameters += `${key.toLowerCase()}=${value}&`;
      }
    });

    return this.parameters ? `?${this.parameters.substring(0, this.parameters.length - 1)}` : this.parameters;
  }

  protected buildHttpOptions() {
    let token = localStorage.getItem('token') ?? '';
    return {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', token == '' ? '' : `Bearer ${token}`)
    }
  }

  protected buildHttpOptionsToken(token: string) {
    return {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', token == '' ? '' : `Bearer ${token}`)
    };
  }

  protected getHttpHeaderAuthorization(): HttpHeaders {
    let token = localStorage.getItem('token') ?? '';
    return new HttpHeaders()
      .set('Authorization', token == '' ? '' : `Bearer ${token}`);
  }

  protected buildHttpOptionsAD(token: string) {
    return {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `${token}`)
    }
  }
}