import { Component, OnInit } from '@angular/core';
import { Libro } from '../Modelo/Libro';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-libro',
  templateUrl: './edit-libro.component.html',
  styleUrls: ['./edit-libro.component.css']
})
export class EditLibroComponent implements OnInit {

  libro: Libro = new Libro();
  
  constructor(private router:Router, private service:BackendService) { }

  ngOnInit(): void {
    this.editar();
  }

  editar(){
    let id = localStorage.getItem("idLibro")
    this.service.getLibroId(+id)
    .subscribe(data=>{
      this.libro=data;
    })
  }
  actualizar(libro:Libro){
    console.log(libro)
    this.service.updateLibro(libro)
    .subscribe(data=>{
      this.libro=data;
      Swal.fire({
        icon: 'success',
        text: 'Libro actualizado con éxito'
      })
      this.router.navigate(["/catalogo"])
    })
  }
  
}
