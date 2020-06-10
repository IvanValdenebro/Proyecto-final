import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service'
import { Usuario } from '../Modelo/Usuario';
import { Libro } from '../Modelo/Libro';
import { Prestamo } from '../Modelo/Prestamo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogo-libros',
  templateUrl: './catalogo-libros.component.html',
  styleUrls: ['./catalogo-libros.component.css']
})
export class CatalogoLibrosComponent implements OnInit {
  p : number=1;
  libros: Libro[];
  usuarios: Usuario[];
  prestamo: Prestamo = new Prestamo();
  role: string;
  public now: Date = new Date();
  constructor(private service: BackendService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.service.getLibro()
      .subscribe(data => {
        this.libros = data;
      })

  }
  eliminar(libros: Libro) {
    this.service.deleteLibro(libros)
      .subscribe(data => {
        Swal.fire({
          icon: 'success',
          text: 'Libro eliminado con éxito'
        })
        this.ngOnInit();
      })
  }
  editar(libros: Libro) {
    localStorage.setItem("idLibro",libros.id.toString())    
    this.router.navigate(["/edit"]);
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
    this.prestamo.fechaRecogida= this.now;
    this.service.createPrestamo(this.prestamo)
      .subscribe(data => {
        Swal.fire({
          icon: 'success',
          text: 'Se ha hecho el prestamo con éxito'
        })
        this.ngOnInit();
      })
     
  }

}
