import { Component, OnDestroy, OnInit } from '@angular/core';
import { PreguntadosService } from '../../../services/preguntados/preguntados.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preguntados',

  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})
export class PreguntadosComponent implements OnInit, OnDestroy {


  perros: any[] = [];
  selectedPerros:any;
  selectedRaza: string = "";
  suscription!: Subscription;

  constructor (private preguntadosService : PreguntadosService){
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  ngOnInit():void{
    this.suscription = this.preguntadosService.getPerros()
    .subscribe(perros => {
      this.perros = perros;
    });
  }
}
