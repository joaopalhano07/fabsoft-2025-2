import { Component, ElementRef, ViewChild } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-cliente',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
  providers: [ClienteService, Router]
})
export class ClienteComponent {
  listaClientes: Cliente[] = []

  @ViewChild('myModal') modalElement!: ElementRef;
  private modal!: bootstrap.Modal;

  private ClienteSelecionado!: Cliente;

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

  alterar(cliente:Cliente){
    this.router.navigate(['clientes/alterar', cliente.id]);
  }

  abrirConfirmacao(cliente:Cliente){
    this.ClienteSelecionado = cliente;
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
    this.modal.show();
  }

  fecharConfirmacao(){
    this.modal.hide();
  }

  confirmarExclusao(){
    this.clienteService.excluirCliente(this.ClienteSelecionado.id!.toString())
      .subscribe(
        () => {
        this.fecharConfirmacao()
        this.clienteService.getClientes()
        .subscribe( 
          clientes => {
            this.listaClientes = clientes
          }
        )
      },
      error => {
        console.error('Erro ao excluir cliente: ', error)
      }
    )
  }

}
