import { Component } from '@angular/core';
import { Libro } from '../models/Libro';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { Prestamo } from '../models/Prestamo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  libros: Libro[];
  prestamo: Prestamo = new Prestamo();
  role: string;
  constructor(private service: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.service.getLibro()
      .subscribe(data => {
        this.libros = data;
      })
}
logout(){
  localStorage.setItem("role",null)
  this.router.navigate(["/"])
}
createPrestamo(libros: Libro) {
  localStorage.setItem("idLibro",libros.id.toString())
  libros.stock=false;
  this.service.updateLibro(libros)
  .subscribe(data => {
  })  
  var id: number = +localStorage.getItem("usuarioId")
  this.prestamo.idUsuario = id;
  this.prestamo.alquilado = true;
  this.prestamo.idLibro = libros.id;
  this.prestamo.titulo = libros.nombre;
  this.service.createPrestamo(this.prestamo)
    .subscribe(data => {
      Swal.fire({
        icon: 'success',
        text: 'Se alquiló con exito'
      })
      this.ngOnInit();
    })
   
}
}
