import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CatalogoLibrosComponent } from './catalogo-libros/catalogo-libros.component';
import {BackendService } from '../app/services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { DevolucionComponent } from './devolucion/devolucion.component';
import { AddLibroComponent } from './add-libro/add-libro.component';
import { EditLibroComponent } from './edit-libro/edit-libro.component';
import {NgxPaginationModule} from 'ngx-pagination'; 



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    CatalogoLibrosComponent,
    DevolucionComponent,
    AddLibroComponent,
    EditLibroComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ], 
  providers: [BackendService],
  exports:[FormsModule],

  bootstrap: [AppComponent]
})
export class AppModule { }
