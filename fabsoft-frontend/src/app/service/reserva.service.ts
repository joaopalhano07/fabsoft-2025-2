import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../model/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  apiURL = 'http://localhost:8080/api/v1/reservas'
  
  constructor(private http:HttpClient) {}

  getReservas(){
    return this.http.get<Reserva[]>(this.apiURL)
  }

  saveReservas(reserva:Reserva){
    if(reserva.id){
      return this.http.put(this.apiURL + '/' + reserva.id, reserva)  
    }
    return this.http.post(this.apiURL, reserva)
  }

  getReservaById(id: string){
    return this.http.get<Reserva>(this.apiURL + '/' + id)
  }

  excluirReserva(id: string){
    return this.http.delete(this.apiURL + '/' + id)
  }

}
