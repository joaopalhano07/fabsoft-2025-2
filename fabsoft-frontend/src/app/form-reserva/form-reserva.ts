import { Component, OnInit } from '@angular/core'; 
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Seus Imports
import { ReservaService } from '../service/reserva.service';
import { QuadraService } from '../service/quadra.service'; 
import { Reserva } from '../model/reserva';
import { Quadra } from '../model/quadra';
import { ModalidadeEsportiva } from '../model/modalidadeEsportiva';
import { ModalidadeEsportivaService } from '../service/modalidadeEsportiva.service';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-form-reserva',
  standalone: true, 
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './form-reserva.html',
  styleUrl: './form-reserva.css',
  providers: [ReservaService, QuadraService, ModalidadeEsportivaService, ClienteService, Router] 
})
export class FormReserva implements OnInit { 

  reserva: Reserva = new Reserva();
  listaQuadras: Quadra[] = [];
  listaModalidades: ModalidadeEsportiva [] = [];
  listaClientes: Cliente[] = [];

  constructor(
    private reservaService: ReservaService,
    private quadraService: QuadraService,
    private modalidadeEsportivaService: ModalidadeEsportivaService,
    private clienteService: ClienteService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) { 
  }

  ngOnInit() {
    this.carregarQuadras();
    this.carregarModalidades(); 
    this.carregarClientes();

    const id = this.activeRouter.snapshot.paramMap.get('id');
    if (id) {
      this.reservaService.getReservaById(id).subscribe(res => {
        console.log('Dados da Reserva carregados:', res);
        this.reserva = res;
      });
    }
}

  carregarQuadras() {
    this.quadraService.getQuadras().subscribe(lista => {
      this.listaQuadras = lista;
    });
  }

  carregarModalidades() {
    this.modalidadeEsportivaService.getModalidades().subscribe(lista => {
      this.listaModalidades = lista;
    });
  }

  carregarClientes() {
    this.clienteService.getClientes().subscribe(lista => {
      this.listaClientes = lista;
    });
  }

  salvar() {
    const reservaParaEnviar: any = { ...this.reserva };

    if (this.reserva.quadra) {
        if (typeof this.reserva.quadra === 'number') {
            reservaParaEnviar.quadra = { id: this.reserva.quadra };
        }
    } else {
        reservaParaEnviar.quadra = null;
    }
    if (this.reserva.modalidadeEsportiva) {
        if (typeof this.reserva.modalidadeEsportiva === 'number') {
             reservaParaEnviar.modalidadeEsportiva = { id: this.reserva.modalidadeEsportiva };
        }
    } else {
        reservaParaEnviar.modalidadeEsportiva = null;
    }

    if (this.reserva.cliente) {
         reservaParaEnviar.cliente = { id: this.reserva.cliente };
         
    } 

    else if (this.reserva['cliente'] && typeof this.reserva['cliente'] === 'number') {
         reservaParaEnviar.cliente = { id: this.reserva['cliente'] };
    }

    console.log('JSON Final:', reservaParaEnviar);

    this.reservaService.saveReservas(reservaParaEnviar).subscribe({
      next: (resultado) => {
        console.log('Sucesso!');
        this.router.navigate(['reservas']);
      },
      error: (erro) => {
        console.error('Erro ao salvar:', erro);
        alert('Erro 400. Verifique se Cliente e Status também estão corretos.');
      }
    });
  }
}