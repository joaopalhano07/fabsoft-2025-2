import { Component, ElementRef, ViewChild } from '@angular/core';
import { Quadra } from '../model/quadra';
import { QuadraService } from '../service/quadra.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-quadra',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './quadra.html',
  styleUrl: './quadra.css',
  providers: [QuadraService, Router]
})
export class QuadraComponent {
  listaQuadras: Quadra[] = []

  @ViewChild('myModal') modalElement!: ElementRef;
  private modal!: bootstrap.Modal;

  private QuadraSelecionada!: Quadra;

  constructor(
    private quadraService: QuadraService, 
    private router:Router
  ){}

  ngOnInit(){
    console.log('Carregando quadras...')
    this.quadraService.getQuadras().subscribe( quadras => {
      this.listaQuadras = quadras
    })
  }

  novo(){
    this.router.navigate(['quadras/novo']);
  }

  alterar(quadra:Quadra){
    this.router.navigate(['quadras/alterar', quadra.id]);
  }

  abrirConfirmacao(quadra:Quadra){
    this.QuadraSelecionada = quadra;
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
    this.modal.show();
  }

  fecharConfirmacao(){
    this.modal.hide();
  }

  confirmarExclusao(){
    this.quadraService.excluirQuadra(this.QuadraSelecionada.id!.toString())
      .subscribe(
        () => {
        this.fecharConfirmacao()
        this.quadraService.getQuadras()
        .subscribe( 
          quadras => {
            this.listaQuadras = quadras
          }
        )
      },
      error => {
        console.error('Erro ao excluir quadra: ', error)
      }
    )
  }

}
