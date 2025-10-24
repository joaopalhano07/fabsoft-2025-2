import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { FormCliente } from './form-cliente/form-cliente';


export const routes: Routes = [
    {path: 'clientes', component: ClienteComponent},
    {path: 'clientes/novo', component: FormCliente},
    {path: 'clientes/alterar/:id', component: FormCliente}
];
