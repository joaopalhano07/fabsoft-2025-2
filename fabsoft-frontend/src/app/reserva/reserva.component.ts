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

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './reserva.html',
  styleUrl: './reserva.css',
  providers: [ReservaService, QuadraService, Router] 
})
export class ReservaComponent implements OnInit {

  listaReservas: Reserva[] = [];
  listaQuadras: Quadra[] = []; 

  @ViewChild('myModal') modalElement!: ElementRef;
  private modal!: bootstrap.Modal;

  private reservaSelecionada!: Reserva;

  constructor(
    private reservaService: ReservaService,
    private quadraService: QuadraService, 
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

}