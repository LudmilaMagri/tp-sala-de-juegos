import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MayorOMenorService {

  constructor() { }

  http = inject(HttpClient);

 obtenerNuevoMazo(): Observable<any> {
  return this.http.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
}

obtenerCarta(deckId: string): Observable<any> {
  return this.http.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
}
}
