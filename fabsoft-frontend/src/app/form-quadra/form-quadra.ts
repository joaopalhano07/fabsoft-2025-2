import { Component } from '@angular/core';
import { Quadra } from '../model/quadra';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuadraService } from '../service/quadra.service';

@Component({
  selector: 'app-form-quadra',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './form-quadra.html',
  styleUrl: './form-quadra.css',
  providers: [QuadraService, Router]
})
export class FormQuadra {
  quadra: Quadra = new Quadra();

  constructor(
    private quadraService:QuadraService,
    private router:Router,
    private activeRouter: ActivatedRoute
  ){
    let id = this.activeRouter.snapshot.paramMap.get('id');

    if(id) {
  this.quadraService.getQuadraById(id).subscribe(res => {
     console.log('O QUE VEIO DO BANCO:', res); // <--- OLHE ISSO NO F12
     this.quadra = res;
  });
}
  }

  salvar(){
    this.quadraService.saveQuadras(this.quadra)
      .subscribe(resultado => {
        this.router.navigate(['quadras'])
      })
  }


}
