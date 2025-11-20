import { Injectable } from '@angular/core';
import { Quadra } from '../model/quadra';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuadraService {
  apiURL = 'http://localhost:8080/api/v1/quadras'
  
  constructor(private http:HttpClient) {}

  getQuadras(){
    return this.http.get<Quadra[]>(this.apiURL)
  }

  saveQuadras(quadra:Quadra){
    if(quadra.id){
      return this.http.put(this.apiURL + '/' + quadra.id, quadra)  
    }
    return this.http.post(this.apiURL, quadra)
  }

  getQuadraById(id: string){
    return this.http.get<Quadra>(this.apiURL + '/' + id)
  }

  excluirQuadra(id: string){
    return this.http.delete(this.apiURL + '/' + id)
  }

}
