import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
  providers: [ClienteService, Router]
})
export class ClienteComponent {
  listaClientes: Cliente[] = []

  constructor(
    private clienteService: ClienteService, 
    private router:Router
  ){}

  ngOnInit(){
    console.log('Carregando clientes...')
    this.clienteService.getClientes().subscribe( clientes => {
      this.listaClientes = clientes
    })
  }

  novo(){
    this.router.navigate(['clientes/novo']);
  }

}
