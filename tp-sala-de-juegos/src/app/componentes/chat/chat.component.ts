import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, query, collection, orderBy, collectionData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{

  mensaje: string = '';
  sub!: Subscription;
  chatCollection: any[] = [];
  countChats: number = 0;

  constructor (public auth: Auth, private firestore: Firestore)
  {

  }
  ngOnInit(): void {
    this.obtenerChatsBD();
  }

registroChatBD()
{
  let collec = collection(this.firestore, 'chats');
  addDoc(collec, {
    'fecha' : new Date(), 
    'usuario': this.auth.currentUser?.email,
    'mensaje': this.mensaje
  }) 
}

obtenerChatsBD(){
  let collec = collection(this.firestore, 'chats');
  const filteredQuery = query(
    collec, 
    orderBy('fecha', 'asc')
  )
  const observable = collectionData(filteredQuery);
  this.sub = observable.subscribe((res: any) => {
    this.chatCollection = res;
    this.countChats = this.chatCollection.length;
  })
}

}
