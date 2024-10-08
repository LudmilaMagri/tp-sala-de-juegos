import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { AhorcadoComponent } from './componentes/juegos/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './componentes/juegos/preguntados/preguntados.component';
import { MayorOMenorComponent } from '../componentes/juegos/mayor-o-menor/mayor-o-menor.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';

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
        path: 'juegos', loadChildren: () => import('./modulos/juegos/juegos.module').then((m) => m.JuegosModule)
    },
    {
        path: 'chat', component: ChatComponent
    },
    {
        path: 'encuesta', component: EncuestaComponent
    },
    {
        path: '**', component: LoginComponent
    }
    
];
