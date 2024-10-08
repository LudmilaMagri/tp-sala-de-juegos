import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addDoc, query, collection, Firestore, orderBy, collectionData } from '@angular/fire/firestore';
import { Auth,  signInWithEmailAndPassword} from '@angular/fire/auth';
import  Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent implements OnInit{

  form!:FormGroup;

  constructor(public auth: Auth, private firestore: Firestore, public router: Router) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      apellido: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      edad: new FormControl('', [Validators.pattern('^[0-9]+$'),Validators.required, Validators.min(18), Validators.max(99)]),
      telefono: new FormControl('', [Validators.pattern('^[0-9]+$'),Validators.required, Validators.maxLength(10)]),
      pregunta1: new FormControl('', [Validators.required]),
      pregunta2: new FormControl('', [Validators.required]),
      pregunta3: new FormControl('', [Validators.required])
    });  
  }

  get nombre(){
    return this.form.get('nombre');
  }
  get apellido(){
    return this.form.get('apellido');
  }
  get edad(){
    return this.form.get('edad');
  }
  get telefono(){
    return this.form.get('telefono');
  }
  get pregunta1(){
    return this.form.get('pregunta1');
  }
  get pregunta2(){
    return this.form.get('pregunta2');
  }
  get pregunta3(){
    return this.form.get('pregunta3');
  }


  registroEncuesta(){
  let collec = collection(this.firestore, 'encuesta');
  addDoc(collec, {
    'fecha' : new Date(),
    'nombre' : this.form.value.nombre,
    'apellido' : this.form.value.apellido,
    'edad' : this.form.value.edad,
    'telefono' : this.form.value.telefono,
    'pregunta1' : this.form.value.pregunta1,
    'pregunta2' : this.form.value.pregunta2,
    'pregunta3' : this.form.value.pregunta3,
    'user': this.auth.currentUser?.email
  });
}

  enviarForm(){
    if(this.form.valid){
      console.log(this.form.value);
      this.registroEncuesta();
      Swal.fire({
        title: "Encuesta enviada",
        text: `Muchas gracias`,
        icon: "success",
        })
        this.router.navigate(['/home']);
        
    }else{
      Swal.fire({
        title: "Faltan campos",
        text: `Muchas gracias`,
        icon: "error",
        })
    }
  }
  updateValue(event: any) {
    const value = event.target.value;
    document.getElementById('rangeValue')!.innerText = value;
  }
}
