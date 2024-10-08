import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../../../services/pokemon/pokemon.service';
import { Subscription } from 'rxjs';
import  Swal from 'sweetalert2';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent implements OnInit, OnDestroy{

  pokemon: any;
  sub!: Subscription;
  pokemonImagen: any;
  respuesta: string = '';
  pokemonAdivinado: boolean = false; 
  tiposPokemon: string[] = [];
  tiposDisponibles: {[key:string]: string} = {
    normal: 'Normal',
    fighting: 'Lucha',
    flying: 'Volador',
    poison: 'Veneno',
    ground: 'Tierra',
    rock: 'Roca',
    bug: 'Bicho',
    ghost: 'Fantasma',
    steel: 'Acero',
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Planta',
    electric: 'Eléctrico',
    psychic: 'Psíquico',
    ice: 'Hielo',
    dragon: 'Dragón',
    dark: 'Siniestro',
    fairy: 'Hada'
    
  }
    

  constructor(public pokemonService: PokemonService){}

ngOnInit(): void {
  this.iniciarJuego();
}

iniciarJuego(){
  this.pokemonAdivinado = false;
  this.sub = this.pokemonService.generarTodosPokemon().subscribe(pokemonRandom => {
    this.pokemon = pokemonRandom;
    this.pokemonImagen = this.pokemon.sprites.front_default;
    this.tiposPokemon = this.pokemon.types.map((tipo: any) => tipo.type.name)
    console.log(this.pokemon.type);
  });

}

ngOnDestroy(): void {
  this.sub.unsubscribe();
}

jugar(tipoSeleccionado: string){
  const tipoIngles = Object.keys(this.tiposDisponibles).find(
    key => this.tiposDisponibles[key] === tipoSeleccionado);
  
  if(tipoIngles && this.tiposPokemon.includes(tipoIngles)){
    Swal.fire({
      title: "¡Adivinaste el tipo!",
      text: `El tipo del Pokémon es ${tipoSeleccionado}`,
      icon: "success",
      confirmButtonText: "Jugar otra vez"
    }).then((result) =>{
      if(result.isConfirmed){
        this.iniciarJuego();
        this.respuesta= '';
      }
    });
  }else{
    Swal.fire({
      title: "Te confundiste!",
      text: "Segui intentando!",
      icon: "error"
    }).then((result) =>{
      if(result.isConfirmed){
      }
    });
  }
}

}
