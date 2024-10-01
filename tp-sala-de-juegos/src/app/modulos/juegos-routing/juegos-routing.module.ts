import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreguntadosComponent } from '../../componentes/juegos/preguntados/preguntados.component';
import { MayorOMenorComponent } from '../../componentes/juegos/mayor-o-menor/mayor-o-menor.component';
import { Ahorca2Component } from '../../componentes/juegos/ahorca2/ahorca2.component';
import { PokemonComponent } from '../../componentes/juegos/pokemon/pokemon.component';

const routes: Routes = [  {
  path: 'ahorca2', component: Ahorca2Component
},
{
  path: 'preguntados', component: PreguntadosComponent
},
{
  path: 'pokemon', component: PokemonComponent
},
{
  path: 'mayor-o-menor', component: MayorOMenorComponent
}]


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class JuegosRoutingModule { }
