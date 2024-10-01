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

  constructor(public pokemonService: PokemonService){}

ngOnInit(): void {
  this.iniciarJuego();
}

iniciarJuego(){
  this.pokemonAdivinado = false;
  this.sub = this.pokemonService.generarTodosPokemon().subscribe(pokemonRandom => {
    this.pokemon = pokemonRandom;
    this.pokemonImagen = this.pokemon.sprites.back_default;
    console.log(this.pokemon);
  });

}

ngOnDestroy(): void {
  this.sub.unsubscribe();
}

jugar(){
  if(this.respuesta == this.pokemon.name){
    Swal.fire({
      title: "Adivinaste el POKEMON",
      text: "Cada vez mas cerca de ser un maestro pokemon!",
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
        this.iniciarJuego();
        this.respuesta= '';
      }
    });
  }
}

}
