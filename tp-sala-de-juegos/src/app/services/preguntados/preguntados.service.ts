import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, inject } from '@angular/core';

import { forkJoin, map , Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  constructor() { }
  http = inject(HttpClient);

  obtenerPaises(): Observable<any[]> {
    return this.http.get<any[]>('https://restcountries.com/v3.1/all?fields=flags,name,translations').pipe(
      map((data: any[]) => {
        return data.map((country) => ({
          flag: country.flags.png,
          name: country.translations.spa ? country.translations.spa.official : country.name.common
        }));
      })
    );
  }

 
 
}