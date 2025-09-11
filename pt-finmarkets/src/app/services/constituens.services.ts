import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constituens } from '@app/interfaces/constituens.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConstituentsService {
  private http = inject(HttpClient);
  private baseURL = 'assets/json-angular/';
  constructor() {}

  getConstituents(path: string): Observable<Constituens> {
    // const httParams = new HttpParams()
    //   .set('page[number]', params['page[number]'])
    //   .set('page[size]', params['page[size]'])
    //   .set('sort', JSON.stringify(params.sort || 'name'))
    //   .set('fields', JSON.stringify(params.fields || {}));
    return this.http.get<Constituens>(
      this.baseURL + 'constituyentes/constituents-' + path + '.json',
      {
        //   params: httParams,
      },
    );
  }
}
