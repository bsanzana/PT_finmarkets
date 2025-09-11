import { HttpClient, HttpParams } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Constituens } from '@app/interfaces/constituens.interface';
import { Observable } from 'rxjs';
import { Index } from '../interfaces/index.interface';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  indexes = signal<Index[]>([
    { name: 'AGUAS-A', path: 'history-AGUAS-A.json' },
    { name: 'ANDINA-B', path: 'history-ANDINA-B.json' },
    { name: 'BCI', path: 'history-BCI.json' },
    { name: 'CAP', path: 'history-CAP.json' },
    { name: 'IPSA', path: 'history-IPSA.json' },
  ]);

  selectedIndex = signal<Index>(this.indexes()[0]);
  private http = inject(HttpClient);
  private baseURL = 'assets/json-angular';

  getHistory(index: string): Observable<Constituens> {
    // const httParams = new HttpParams()
    //   .set('page[number]', params['page[number]'])
    //   .set('page[size]', params['page[size]'])
    //   .set('sort', JSON.stringify(params.sort || 'name'))
    //   .set('fields', JSON.stringify(params.fields || {}));
    return this.http.get<Constituens>(this.baseURL + '/history/' + index, {
      //   params: httParams,
    });
  }
}
