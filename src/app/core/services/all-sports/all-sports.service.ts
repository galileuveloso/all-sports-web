import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllSportsService<T> extends ApiService<T> {
  constructor(
  ) {
    super();
    this.url = environment.allSports.url
  }
}
