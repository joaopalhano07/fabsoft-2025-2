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
  styleUrl: './form-reserva.scss',
  providers: [ReservaService, QuadraService, ModalidadeEsportivaService, ClienteService, Router] 
})
export class FormReserva implements OnInit { 

  reserva: Reserva = new Reserva();
  listaQuadras: Quadra[] = [];
  listaModalidades: ModalidadeEsportiva [] = [];
  listaClientes: Cliente[] = [];
  listaStatus = [
    { id: 'Confirmada', nome: 'Confirmada' },
    { id: 'Pendente', nome: 'Pendente' },
    { id: 'Cancelada', nome: 'Cancelada' }
  ];

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
        console.log('Dados da Reserva carregados:', res.dataHoraInicio);
        this.reserva = res;
        if (res.quadra && typeof res.quadra !== 'number') {
          this.reserva.quadra = res.quadra.id;
      }
        if (res.modalidadeEsportiva && typeof res.modalidadeEsportiva !== 'number') {
          this.reserva.modalidadeEsportiva = res.modalidadeEsportiva.id;
      }

        if (res.cliente && typeof res.cliente !== 'number') {
          this.reserva.cliente = res.cliente.id;
      }
        this.reserva.dataHoraInicio = this.converterDataParaInput(res.dataHoraInicio);
        this.reserva.dataHoraFim = this.converterDataParaInput(res.dataHoraFim);
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

    this.reservaService.saveReservas(reservaParaEnviar).subscribe({
      next: (resultado) => {
        console.log('Sucesso!');
        this.router.navigate(['reservas']);
      },
      error: (erro) => {
        console.error('Erro ao salvar:', erro);
        alert('Erro 400. Verifique.');
      }
    });
  }

  converterDataParaInput(data: any): any {
  if (!data) return '';
  if (typeof data === 'number') {
      const dataObj = new Date(data);

      const ano = dataObj.getUTCFullYear();
      const mes = (dataObj.getUTCMonth() + 1).toString().padStart(2, '0');
      const dia = dataObj.getUTCDate().toString().padStart(2, '0');
      const hora = dataObj.getUTCHours().toString().padStart(2, '0');
      const min = dataObj.getUTCMinutes().toString().padStart(2, '0');
      
      return `${ano}-${mes}-${dia}T${hora}:${min}`;
  }
}

  voltar(){
    this.router.navigate(['reservas'])
  }
}