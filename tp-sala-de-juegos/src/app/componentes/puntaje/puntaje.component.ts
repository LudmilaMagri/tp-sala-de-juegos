import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, query, collection, orderBy, collectionData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { PuntajeService } from '../../services/puntaje.service';


@Component({
  selector: 'app-puntaje',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './puntaje.component.html',
  styleUrl: './puntaje.component.scss'
})
export class PuntajeComponent implements OnInit {

  sub!: Subscription;
  puntajeCollection: any[] = [];
  countPuntajes: number = 0;

  constructor (public auth: Auth, private firestore: Firestore, public registroPuntaje: PuntajeService)
  {
  }


  ngOnInit(): void {
    this.obtenerPuntajesBD();
  }

obtenerPuntajesBD(){
  let collec = collection(this.firestore, 'puntaje');
  const filteredQuery = query(
    collec,
    orderBy('puntaje', 'desc')
  )
   const observable = collectionData(filteredQuery);
   this.sub = observable.subscribe((res: any) => {
    this.puntajeCollection = res;
    this.countPuntajes = this.puntajeCollection.length;

   })
}

}

