import { Component } from '@angular/core';
import { addDoc, query, collection, Firestore, orderBy, collectionData } from '@angular/fire/firestore';
import { Auth,  signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import  Swal from 'sweetalert2';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../chat/chat.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  

loginCollections: any[] = [];
countLogin: number = 0;
private sub !: Subscription;
constructor (public auth: Auth, private firestore: Firestore, private router: Router)
  {

  }



obtenerRegistroBD()
{
  let collec = collection(this.firestore, 'logins');
  const filteredQuery = query(collec)
  const observable = collectionData(filteredQuery);
  this.sub = observable.subscribe((respuesta: any) => {
    this.loginCollections = respuesta;
    this.countLogin = this.loginCollections.length;
    console.log(respuesta);
  })
}

cerrarSesion(path: string){
  signOut(this.auth).then(() =>{
    this.router.navigate([path]);
    Swal.fire({
      title: "Cerraste sesion",
      text: "byeeeeeee",
      icon: "info"
    });
  }).catch((e)=>{
    console.log(e.code);
  })
}


}