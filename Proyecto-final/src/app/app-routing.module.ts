import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CatalogoLibrosComponent } from './catalogo-libros/catalogo-libros.component';
import { DevolucionComponent } from './devolucion/devolucion.component';
import { AddLibroComponent } from './add-libro/add-libro.component';

import {AuthGuard} from './guards/auth.guard';
import { EditLibroComponent } from './edit-libro/edit-libro.component';
const routes: Routes = [
  { path:'inicio', component: InicioComponent},
  { path:'catalogo', component: CatalogoLibrosComponent},
  { path:'devolucion', component: DevolucionComponent},
  { path:'addLibro', component: AddLibroComponent, canActivate: [AuthGuard]},
  { path:'edit', component: EditLibroComponent,  canActivate:[AuthGuard]},
  { path:'**', component: InicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
