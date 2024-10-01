import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoService } from '../../../services/ahorcado/ahorcado.service';
import Swal from 'sweetalert2';


const CANTIDAD_ERROR = 6;

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent implements OnInit {
  readonly abecedario = ("A,B,C,D,E,F,G,H,I,J,K,L,M,N,Ñ,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(","));


  public palabra!: string;
  intentoError: number = 0 ;
  letrasSeleccionadas: string[] = []
  finDeJuego = false;
  intentos = CANTIDAD_ERROR;
  imagen: string;
  
  constructor(private ahorcadoService: AhorcadoService){
    this.imagen = "../../../../assets/ahorcado/6.png";
  }

 ngOnInit(){
  this.ahorcadoService.getRandomPalabra()
 
 }

 reiniciarJuego(){
  this.intentoError = 0;
  this.letrasSeleccionadas = [];
  this.finDeJuego = false;
  this.intentos = CANTIDAD_ERROR;
  this.ahorcadoService.getRandomPalabra()
 }

 letrasPalabra(){
  return this.palabra.trim().split('');
 }

 letraEnLaPalabra(letra:string){
  return !!!this.palabra.includes(letra)
 }

 elegirLetra(letra:string){
  this.letrasSeleccionadas.push(letra)
  if(!this.palabra.includes(letra)){
    this.intentoError ++;
    this.intentoError = CANTIDAD_ERROR - this.intentoError;
    this.imagen = "../../../../assets/ahorcado/" +this.intentos+".png";
  }

  if(this.intentoError == CANTIDAD_ERROR){
    this.finDeJuego = true;
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Perdiste :(',
      showConfirmButton: true,
    });
  }else if(this.ganar()){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Ganaste :)',
      showConfirmButton: true,
    });
  }
 }
 ganar(){
  return !!!this.letrasPalabra().find(letra => !this.letrasSeleccionadas.includes(letra))
 }

}
