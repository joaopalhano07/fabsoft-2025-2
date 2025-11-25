import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ModalidadeEsportivaService } from '../service/modalidadeEsportiva.service';
import { ModalidadeEsportiva } from '../model/modalidadeEsportiva';


@Component({
  selector: 'app-form-modalidade',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './form-modalidade.html',
  styleUrl: './form-modalidade.scss',
  providers: [ModalidadeEsportivaService, Router]
})
export class FormModalidadeEsportiva {
  modalidadeEsportiva: ModalidadeEsportiva = new ModalidadeEsportiva();

  constructor(
    private modalidadeEsportivaService:ModalidadeEsportivaService,
    private router:Router,
    private activeRouter: ActivatedRoute
  ){
    let id = this.activeRouter.snapshot.paramMap.get('id');

    if(id) {
  this.modalidadeEsportivaService.getModalidadeById(id).subscribe(res => {
     console.log('O QUE VEIO DO BANCO:', res); // <--- OLHE ISSO NO F12
     this.modalidadeEsportiva = res;
  });
}
  }

  salvar(){
    this.modalidadeEsportivaService.saveModalidades(this.modalidadeEsportiva)
      .subscribe(resultado => {
        this.router.navigate(['modalidades'])
      })
  }

  voltar(){
    this.router.navigate(['modalidades'])
  }

}
