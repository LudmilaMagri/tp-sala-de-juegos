import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { AhorcadoComponent } from './componentes/juegos/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './componentes/juegos/preguntados/preguntados.component';
import { MayorOMenorComponent } from '../componentes/juegos/mayor-o-menor/mayor-o-menor.component';

export const routes: Routes = [
    {
        path: ' ', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'registro', component: RegistroComponent
    },
    {
        path: 'quien-soy', component: QuienSoyComponent
    },
    {
        path: 'ahorcado', component: AhorcadoComponent
    },
    {
        path: 'preguntados', component: PreguntadosComponent
    },
    {
        path: 'mayor-o-menor', component: MayorOMenorComponent
    },
    {
        path: '**', component: LoginComponent
    },
];
