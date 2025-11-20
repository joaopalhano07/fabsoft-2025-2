import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ModalidadeEsportivaService } from '../service/modalidadeEsportiva.service';
import { ModalidadeEsportiva } from '../model/modalidadeEsportiva';


@Component({
  selector: 'app-modalidadeEsportiva',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './modalidadeEsportiva.html',
  styleUrl: './modalidadeEsportiva.css',
  providers: [ModalidadeEsportivaService, Router]
})
export class modalidadeEsportivaComponent {
  listaModalidades: ModalidadeEsportiva[] = []

  @ViewChild('myModal') modalElement!: ElementRef;
  private modal!: bootstrap.Modal;

  private ModalidadeSelecionada!: ModalidadeEsportiva;

  constructor(
    private modalidadeEsportivaService: ModalidadeEsportivaService, 
    private router:Router
  ){}

  ngOnInit(){
    console.log('Carregando Modalidade...')
    this.modalidadeEsportivaService.getModalidades().subscribe( modalidadesEsportivas => {
      this.listaModalidades = modalidadesEsportivas
    })
  }

  novo(){
    this.router.navigate(['modalidades/novo']);
  }

  alterar(modalidadeEsportiva:ModalidadeEsportiva){
    this.router.navigate(['modalidades/alterar', modalidadeEsportiva.id]);
  }

  abrirConfirmacao(modalidadeEsportiva:ModalidadeEsportiva){
    this.ModalidadeSelecionada = modalidadeEsportiva;
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
    this.modal.show();
  }

  fecharConfirmacao(){
    this.modal.hide();
  }

  confirmarExclusao(){
    this.modalidadeEsportivaService.excluirModalidade(this.ModalidadeSelecionada.id!.toString())
      .subscribe(
        () => {
        this.fecharConfirmacao()
        this.modalidadeEsportivaService.getModalidades()
        .subscribe( 
          modalidadesEsportivas => {
            this.listaModalidades = modalidadesEsportivas
          }
        )
      },
      error => {
        console.error('Erro ao excluir modalidade: ', error)
      }
    )
  }

}
