import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  constructor(private http: HttpClient) { }
  
  getPerros(){
    return this.http.get<any[]>("https://dog.ceo/api/breeds/image/random Fetch!")
    .pipe(map(perros => perros.sort((a,b) => {
      if (a.name.common < b.name.common){
        return -1;
      }else if(a.name.common > b.name.common){
        return 1;
      }else {
        return 0;
      }
    })));
  }

}