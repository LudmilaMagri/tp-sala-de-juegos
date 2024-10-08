import { Component, OnInit, OnDestroy } from '@angular/core';
import { MayorOMenorService } from '../../../services/mayor-o-menor/mayor-o-menor.service';
import { Subscription } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { PuntajeService } from '../../../services/puntaje.service';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.scss'
})
export class MayorOMenorComponent implements OnInit, OnDestroy{

  actualCarta: any;
  anteriorCarta: any;
  actualMazo: any;
  idMazo: string = '';
  sub!:Subscription;
  puntaje: number = 0;
  puntajeFinal: number = 0;
  finalJuego:boolean = false
  

  constructor(public auth:Auth, public mayorOMenorService: MayorOMenorService, public registroPuntaje: PuntajeService){

  }

  ngOnInit():void{
    this.iniciarJuego();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  iniciarJuego(){
    this.finalJuego = false;
    this.sub = this.mayorOMenorService.obtenerCarta('new').subscribe((mazoMezclado) => {
      this.actualMazo = mazoMezclado;
      this.idMazo = this.actualMazo.deck_id;

    if(this.actualMazo.deck_id){
      this.robarCartaInicial();
    } else {
      console.error('No se pudo crear el mazo.');
    }

      // this.actualCarta = this.actualMazo.cards[0];
    });
  }
  
  // Método para robar la primera carta del mazo
robarCartaInicial() {
  this.sub = this.mayorOMenorService.obtenerCarta(this.idMazo).subscribe((mazo) => {
    this.actualMazo = mazo;
    if (this.actualMazo.cards && this.actualMazo.cards.length > 0) {
      this.actualCarta = this.actualMazo.cards[0];
      console.log(this.actualCarta);
    } else {
      console.error('No hay cartas disponibles en el mazo.');
    }
  });
}

 robarCarta(elegirMayorMenor: string){
  this.anteriorCarta = this.actualCarta;

  this.sub = this.mayorOMenorService.obtenerCarta(this.idMazo).subscribe((mazo => {
    this.actualMazo = mazo;
    if (this.actualMazo.cards && this.actualMazo.cards.length > 0) {
      this.actualCarta = this.actualMazo.cards[0];
      console.log(this.actualCarta);
      this.evaluarApuesta(elegirMayorMenor);
    } else {
      console.error('No hay cartas disponibles en el mazo.');
    }
  }));
 }

  private evaluarApuesta(eleccionMayorMenor:string){
    const valorAnteriorCarta = this.obtenerValorNum(this.anteriorCarta.value);
    const valorActualCarta = this.obtenerValorNum(this.actualCarta.value);
    const apuestaCorrecta = this.compararCartas(eleccionMayorMenor, valorAnteriorCarta, valorActualCarta)

    if(apuestaCorrecta){
      this.puntaje ++;
    }else{
      this.finJuego();
    }
  }

  compararCartas(eleccion:string, valorAnterior: number, valorActual: number):boolean{
    switch (eleccion) {
      case 'mayor':
        return valorAnterior < valorActual;
      case 'menor':
        return valorAnterior > valorActual;
      case 'igual':
        return valorAnterior === valorActual;
      default:
      return false;
    }
  }
  
   finJuego(){

    this.puntajeFinal = this.puntaje;
    this.puntaje = 0;
    this.finalJuego = true;
    this.sub.unsubscribe();
    this.registroPuntaje.registroPuntaje(this.puntajeFinal, 'Mayor o Menor');
  }

  obtenerValorNum(valorCarta: string):number{
    const valores: { [key:string]: number} = {
      'ACE': 14,
      'KING': 13,
      'QUEEN': 12,
      'JACK': 11
    };
    return valores[valorCarta] || parseInt(valorCarta);
  }

}
