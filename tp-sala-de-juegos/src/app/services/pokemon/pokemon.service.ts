import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  http = inject(HttpClient);

  generarPokemon(urlPokemon: string){
    
    return this.http.request('GET', `${urlPokemon}`)
  }

  generarTodosPokemon(){
    let numRandom = Math.round(Math.random() * (150 - 1) + 1);
    return this.http.request('GET', `https://pokeapi.co/api/v2/pokemon/${numRandom.toString()}`)
  }
}
