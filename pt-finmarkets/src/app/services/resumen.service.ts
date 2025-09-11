import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Resumen } from '@interfaces/resumen.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResumenService {
  resumenIndexSelected = signal<Resumen | null>(null);

  constructor() {}

  private http = inject(HttpClient);
  private baseURL = 'assets/json-angular';

  getResumen(index: string): Observable<Resumen> {
    // const httParams = new HttpParams()
    //   .set('page[number]', params['page[number]'])
    //   .set('page[size]', params['page[size]'])
    //   .set('sort', JSON.stringify(params.sort || 'name'))
    //   .set('fields', JSON.stringify(params.fields || {}));
    return this.http.get<Resumen>(this.baseURL + '/resumen/' + index, {
      //   params: httParams,
    });
  }
}
