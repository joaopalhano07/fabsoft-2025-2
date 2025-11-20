import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalidadeEsportiva } from '../model/modalidadeEsportiva';

@Injectable({
  providedIn: 'root'
})
export class ModalidadeEsportivaService {
  apiURL = 'http://localhost:8080/api/v1/modalidades';
  
  constructor(private http:HttpClient) {}

  getModalidades(){
    return this.http.get<ModalidadeEsportiva[]>(this.apiURL)
  }

  saveModalidades(modalidadeEsportiva:ModalidadeEsportiva){
    if(modalidadeEsportiva.id){
      return this.http.put(this.apiURL + '/' + modalidadeEsportiva.id, modalidadeEsportiva)  
    }
    return this.http.post(this.apiURL, modalidadeEsportiva)
  }

  getModalidadeById(id: string){
    return this.http.get<ModalidadeEsportiva>(this.apiURL + '/' + id)
  }

  excluirModalidade(id: string){
    return this.http.delete(this.apiURL + '/' + id)
  }

}
