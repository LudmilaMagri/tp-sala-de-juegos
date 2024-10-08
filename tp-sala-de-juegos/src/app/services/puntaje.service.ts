import { Injectable } from '@angular/core';
import { addDoc, query, collection, Firestore, orderBy, collectionData } from '@angular/fire/firestore';
import { Auth,  signInWithEmailAndPassword} from '@angular/fire/auth';
import  Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  constructor(public auth: Auth, private firestore: Firestore) { }


registroPuntaje(puntaje:number, juego:string)
{
  let collec = collection(this.firestore, 'puntaje');
  addDoc(collec, {
    'fecha' : new Date(),
    'juego' : juego,
    'puntaje': puntaje,
    'user': this.auth.currentUser?.email
  });
}

}
