import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

// Services e Models
import { ReservaService } from '../service/reserva.service';
import { Reserva } from '../model/reserva';
import { QuadraService } from '../service/quadra.service'; 
import { Quadra } from '../model/quadra'; 
import { ModalidadeEsportivaService } from '../service/modalidadeEsportiva.service';
import { ModalidadeEsportiva } from '../model/modalidadeEsportiva';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './reserva.html',
  styleUrl: './reserva.css',
  providers: [ReservaService, QuadraService, Router, ModalidadeEsportivaService, ClienteService] 
})
export class ReservaComponent implements OnInit {

  listaReservas: Reserva[] = [];
  listaQuadras: Quadra[] = []; 
  listaModalidades: ModalidadeEsportiva[] = [];
  listaClientes: Cliente[] = [];

  @ViewChild('myModal') modalElement!: ElementRef;
  private modal!: bootstrap.Modal;

  private reservaSelecionada!: Reserva;

  constructor(
    private reservaService: ReservaService,
    private quadraService: QuadraService, 
    private modalidadeEsportivaService: ModalidadeEsportivaService,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Carregando reservas e quadras...');
    

    this.reservaService.getReservas().subscribe(reservas => {
      this.listaReservas = reservas;
    });


    this.quadraService.getQuadras().subscribe(quadras => {
      this.listaQuadras = quadras;
    });

    this.modalidadeEsportivaService.getModalidades().subscribe(modalidadeEsportiva => {
      this.listaModalidades = modalidadeEsportiva;
    });

    this.clienteService.getClientes().subscribe(cliente => {
      this.listaClientes = cliente;
    });
  }

  novo() {
    this.router.navigate(['reservas/novo']);
  }

  alterar(reserva: Reserva) {
    this.router.navigate(['reservas/alterar', reserva.id]);
  }

  // --- Lógica do Modal ---
  abrirConfirmacao(reserva: Reserva) {
    this.reservaSelecionada = reserva;
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
    this.modal.show();
  }

  fecharConfirmacao() {
    this.modal.hide();
  }

  confirmarExclusao() {
    if (!this.reservaSelecionada?.id) return;

    this.reservaService.excluirReserva(this.reservaSelecionada.id.toString())
      .subscribe(
        () => {
          this.fecharConfirmacao();
          // Recarrega a lista
          this.reservaService.getReservas().subscribe(reservas => {
            this.listaReservas = reservas;
          });
        },
        error => {
          console.error('Erro ao excluir reserva: ', error);
        }
      );
  }

retornarNomeQuadra(id: any): string {
  if (!id) return '-';
  if (id.nome) return id.nome;
  if (this.listaQuadras.length === 0) {
    return '...'; 
  }
  const idBusca = id.id || id;
  const quadraEncontrada = this.listaQuadras.find(q => q.id == idBusca);

  return quadraEncontrada ? quadraEncontrada.nome : 'Não encontrada';
}

retornarNomeModalidade(id: any): string {
  if (!id) return '-';
  if (id.nome) return id.nome;
  if (this.listaModalidades.length === 0) {
    return '...'; 
  }
  const idBusca = id.id || id;
  const modalidadeEncontrada = this.listaModalidades.find(q => q.id == idBusca);

  return modalidadeEncontrada ? modalidadeEncontrada.nome : 'Não encontrada';
}

retornarNomeCliente(id: any): string {
  if (!id) return '-';
  if (id.nome) return id.nome;
  if (this.listaClientes.length === 0) {
    return '...'; 
  }
  const idBusca = id.id || id;
  const clienteEncontrada = this.listaClientes.find(q => q.id == idBusca);

  return clienteEncontrada ? clienteEncontrada.nome : 'Não encontrada';
}

}