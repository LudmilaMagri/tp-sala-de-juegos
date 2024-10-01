import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MayorOMenorComponent } from '../../componentes/juegos/mayor-o-menor/mayor-o-menor.component';
import { AhorcadoComponent } from '../../componentes/juegos/ahorcado/ahorcado.component';
import { PreguntadosComponent } from '../../componentes/juegos/preguntados/preguntados.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { JuegosRoutingModule } from '../juegos-routing/juegos-routing.module';
import { FormsModule } from '@angular/forms';
import { Ahorca2Component } from '../../componentes/juegos/ahorca2/ahorca2.component';
import { PokemonComponent } from '../../componentes/juegos/pokemon/pokemon.component';



@NgModule({
  declarations: [MayorOMenorComponent, Ahorca2Component, PreguntadosComponent, PokemonComponent],
  imports: [CommonModule, RouterOutlet, JuegosRoutingModule, FormsModule, RouterLink],
  providers: []
})
export class JuegosModule { }
