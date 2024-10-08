import { Component, OnDestroy, OnInit } from '@angular/core';
import { PreguntadosService } from '../../../services/preguntados/preguntados.service';
import { subscribeOn, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { PuntajeService } from '../../../services/puntaje.service';


@Component({
  selector: 'app-preguntados',

  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})
export class PreguntadosComponent implements OnInit, OnDestroy {

flagUrl: string = '';
opcion: string[] = [];
opcionCorrectaIndex?: number;
puntaje: number = 0;
usuario: any;
opcionActual: string[] = [];

 

  constructor (public preguntadosService : PreguntadosService, public registroPuntaje: PuntajeService){
  }

  
ngOnInit():void{
  
  this.jugar();
  
  }
ngOnDestroy(): void {
 
  }

  jugar() {
    this.preguntadosService.obtenerPaises().subscribe((paises) => {
      const randomIndex = Math.floor(Math.random() * paises.length);
      const randomPais = paises[randomIndex];

      this.flagUrl = randomPais.flag;
      this.generarOpcionesIncorrectas(paises, randomPais.name);

      this.opcionCorrectaIndex = Math.floor(Math.random() * 4);
      this.opcion[this.opcionCorrectaIndex] = randomPais.name;

      this.opcionActual = this.opcion.slice();
    });
  }


  generarOpcionesIncorrectas(paises: any[], opcionCorrecta: string){
    const randomPais = this.mezclarPaises(paises).slice(0,4);
    randomPais.forEach((country, index)=>{
      if(index !== this.opcionCorrectaIndex){
        this.opcion[index] = country.name;
      }
    })
  }

  mezclarPaises(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  corroborarRespuesta(seleccionIndex: number){
    if(seleccionIndex === this.opcionCorrectaIndex){
      Swal.fire({
        title:  'Correcto!',
        text: `Sumaste 1 punto :)`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      this.puntaje ++;
      this.jugar();
    }else{
      Swal.fire({
        title:  'Incorrecto, perdiste!',
        text: `Tu puntaje: ${this.puntaje}.`,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
      this.finDeJuego();
    }
    
  }


  resetearJuego(){
    this.puntaje = 0;
    this.jugar();
  }

  finDeJuego(){
    this.registroPuntaje.registroPuntaje(this.puntaje, 'Preguntados');
  this.resetearJuego();
  }
}
