import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-form-cliente',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './form-cliente.html',
  styleUrl: './form-cliente.css',
  providers: [ClienteService, Router]
})
export class FormCliente {
  cliente: Cliente = new Cliente();

  constructor(
    private clienteService:ClienteService,
    private router:Router,
    private activeRouter: ActivatedRoute
  ){
    let id = this.activeRouter.snapshot.paramMap.get('id')

    if(id) {
      this.clienteService.getClienteById(id)
      .subscribe( res => {
        this.cliente = res
      })
    }
  }

  salvar(){
    this.clienteService.saveCliente(this.cliente)
      .subscribe(resultado => {
        this.router.navigate(['clientes'])
      })
  }


}
