import { Component, OnInit, Inject} from '@angular/core';
import Swal from 'sweetalert2';
import { AhorcadoService } from '../../../services/ahorcado/ahorcado.service';
import { Ahorcado } from './ahorcado';
import { PuntajeService } from '../../../services/puntaje.service';

const CANTIDAD_ERROR = 6;

@Component({
  selector: 'app-ahorca2',
  templateUrl: './ahorca2.component.html',
  styleUrl: './ahorca2.component.scss'
})
export class Ahorca2Component implements OnInit {
  public intentos: number = 0;
  public ganadorONo:boolean | undefined = undefined;

  public palabras: string[] = Ahorcado.obtenerPalabra();
  public letrasTeclado: string[] = Ahorcado.obtenerLetraTeclado();
  public letraClickeada: {[letter:string]:boolean} = {};

  public palabraOculta:string = "";
  public palabraAdivinar:string = this.palabras[Math.floor(Math.random() * this.palabras.length)];
  public puntaje: number = 0;

  constructor(public registroPuntaje: PuntajeService){

  }
 
  ngOnInit(): void {
   this.iniciarNuevaPalabra();
  }

  iniciarNuevaPalabra(){
    this.palabraAdivinar = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabraOculta = this.palabraAdivinar.split('')
      .map(letter => letter = '_ ')
      .join('');
      this.letraClickeada = {}; 
    console.log('palabra oculta: ', this.palabraAdivinar);
  }
 
  corroborarLetra(letter:string){
    if(!this.letraClickeada[letter]){
      this.buscarLetra(letter);
      
      const letterHidden = this.palabraOculta.split(" ");
      for(let i = 0; i<= this.palabraAdivinar.length;i++){
        if(this.palabraAdivinar[i] == letter)
          letterHidden[i] = letter;
      }
      
      this.palabraOculta = letterHidden.join(" ");
      this.letraClickeada[letter] = true;

      this.ganarOPerder();
    }
  }

  
  reiniciarJuego(){
    this.intentos = 0;
    this.iniciarNuevaPalabra();
    this.ganadorONo = undefined;
  }
  reiniciarJuegoConPuntaje() {
    this.intentos = 0;
    this.puntaje = 0;
    this.reiniciarJuego(); 
  }

  ganarOPerder(){
    const wordInArray = this.palabraOculta.split(" ");
    const checkWord = wordInArray.join("");
    
    if(checkWord == this.palabraAdivinar){
      this.puntaje++;
      this.ganadorONo = true;
      Swal.fire({
        title: 'Felicidades, ganaste!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.iniciarNuevaPalabra();
      });
    }
    else if(this.intentos == 6){
      this.ganadorONo = false;
      Swal.fire({
        title: 'Perdiste, segui intentando!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.reiniciarJuegoConPuntaje();
    }
  }

 
  buscarLetra(letter:string){
    if(!this.palabraAdivinar.includes(letter)){
      this.intentos++;
    }
  }
}
  
  

