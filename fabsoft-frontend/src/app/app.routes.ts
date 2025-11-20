import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { FormCliente } from './form-cliente/form-cliente';
import { QuadraComponent } from './quadra/quadra.component';
import { FormQuadra } from './form-quadra/form-quadra';
import { modalidadeEsportivaComponent } from './modalidadeEsportiva/modalidadeEsportiva.component';
import { FormModalidadeEsportiva } from './form-modalidadeEsportiva/form-modalidade';


export const routes: Routes = [
    {path: 'clientes', component: ClienteComponent},
    {path: 'clientes/novo', component: FormCliente},
    {path: 'clientes/alterar/:id', component: FormCliente},
    {path: 'quadras', component: QuadraComponent},
    {path: 'quadras/novo', component: FormQuadra},
    {path: 'quadras/alterar/:id', component: FormQuadra},
    {path: 'modalidades', component: modalidadeEsportivaComponent},
    {path: 'modalidades/novo', component: FormModalidadeEsportiva},
    {path: 'modalidades/alterar/:id', component: FormModalidadeEsportiva}
];
