import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth,  createUserWithEmailAndPassword} from '@angular/fire/auth';




@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  newUser: string = '';
  newPassword: string = '';
  logUser: string = '';
  registroError: boolean = false;  

  goToLogin(path: string){
    this.router.navigate([path]);
  }

  registrar(path: string){
    createUserWithEmailAndPassword(this.auth, this.newUser, this.newPassword).then((res)=>
    {
      if(res.user.email !== null) this.logUser = res.user.email;
      this.registroError = false;
      Swal.fire({
        title: "Creaste un usuario nuevo :)",
        text: "Exito!",
        icon: "success"
      });
      this.router.navigate([path]);
    }).catch((e)=>
    {
      this.registroError = true;
      switch (e.code){
        case 'auth/invalid-email-already-in-use':
          Swal.fire({
            title: "El mail ingresado ya esta en uso",
            text: "Ingresa otro mail!",
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
    })
  }

  constructor (public auth: Auth,  private router: Router)
  {

  }
}
