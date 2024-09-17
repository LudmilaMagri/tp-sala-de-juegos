import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { addDoc, query, collection, Firestore, orderBy, collectionData } from '@angular/fire/firestore';
import { Auth,  signInWithEmailAndPassword} from '@angular/fire/auth';
import  Swal from 'sweetalert2';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

user: string = '';
password: string = '';
logUser: string = '';
logError: boolean = false;  




goToRegistrar(path: string){
  this.router.navigate([path]);
}

login(path: string) 
{
  signInWithEmailAndPassword(this.auth, this.user, this.password).then((res)=> {
    this.logError = false;
    this.router.navigate([path])
    this.registroLoginBD();
    Swal.fire({
      title: "Iniciaste sesion",
      text: "Bienvenido",
      icon: "success"
    });
  }).catch((e)=> {
    this.logError = true;
    console.log(e.code);
    switch(e.code){
      case 'auth/invalid-email':     
      Swal.fire({
        title: "Mail invalido",
        text: "Mail error",
        icon: "error"
      });
      break;
      default:
        Swal.fire({
          title: e.code,
          text: "error",
          icon: "error"
        });
        break;
    }
  }

  );
}


registroLoginBD()
{
  let collec = collection(this.firestore, 'logins');
  addDoc(collec, {
    'fecha' : new Date(), 
    'usuario': this.user
  }) 
}



  constructor (public auth: Auth, private firestore: Firestore, private router: Router)
  {

  }

}
