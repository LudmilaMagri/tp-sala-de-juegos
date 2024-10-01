import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, DocumentData, Firestore, getDocs, query } from '@angular/fire/firestore';
import { Word } from '../../componentes/modelos/modelo';

@Injectable ({
    providedIn: 'root'
})
export class AhorcadoService{
    //palabras: string[] = ['botella', 'pantalla', 'mate', 'agua', 'ventilador', 'lampara', 'mochila', 'monitor'];
    
    constructor(private firestore: Firestore){}


    async getRandomPalabra(){
        let palabraArr: Word[] = [];
        (await getDocs(collection(this.firestore, "words")))
        .forEach((doc) => {
            palabraArr.push(doc.data() as Word);
        });

        const posicionRandom = Math.floor(Math.random() * palabraArr.length);
        return palabraArr[posicionRandom].word;
    }
/*
    getRandomPalabra(){

        console.log(this.palabras);
        return this.palabras.sort(() => Math.random() - 0.5);
    }*/
}