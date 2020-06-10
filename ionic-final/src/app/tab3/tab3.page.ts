import { Component } from '@angular/core';
import { Libro } from '../models/Libro';
import { Prestamo } from '../models/Prestamo';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  libro: Libro = new Libro();
  prestamos:Prestamo[];
  prestamo: Prestamo = new Prestamo();
  role: string;
  constructor(private service:BackendService, private router:Router) { }


  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    var y: number = +localStorage.getItem("usuarioId");
    this.service.getPrestamoId(y)
    .subscribe(data=>{
      this.prestamos=data;
    })
  }
  logout(){
    localStorage.setItem("role",null)
    this.router.navigate(["/"])
  }
  devolver(prestamos:Prestamo){
    localStorage.setItem("idLibro",prestamos.idLibro.toString())
    localStorage.setItem("idPrestamo",prestamos.id.toString())
    console.log(localStorage.getItem("idLibro"))
    let idLibro = localStorage.getItem("idLibro")
    let idPrestamo = localStorage.getItem("idPrestamo")
    this.service.getLibroId(+idLibro)
    .subscribe(data=>{
      this.libro=data;
      this.libro.stock=true;
     this.service.updateLibro(this.libro)
     .subscribe(data => {
      this.libro=data;
   })  
    })
    this.service.getPrestamoIdUsuario(+idPrestamo)
    .subscribe(data => {
      this.prestamo=data;
      this.prestamo.alquilado=false;
      console.log("prestamo seleccionado"+data)
      this.service.updatePrestamo(this.prestamo)
      .subscribe(data => {
        this.prestamo=data;
        console.log("prestamo updateado"+this.prestamo)
        this.ngOnInit();
        Swal.fire({
          icon: 'success',
          text: 'Se devolvió con exito'
        })
     })
   })  
    

  }

}
