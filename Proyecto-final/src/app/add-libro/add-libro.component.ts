import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { Libro } from '../Modelo/Libro';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-libro',
  templateUrl: './add-libro.component.html',
  styleUrls: ['./add-libro.component.css']
})
export class AddLibroComponent implements OnInit {

  libro: Libro = new Libro();
  
  constructor(private router:Router, private service:BackendService) { }

  ngOnInit(): void {
  
  }

  guardar(){
    this.libro.stock=true;
    this.service.createLibro(this.libro)
    .subscribe(data=>{
      Swal.fire({
        icon: 'success',
        text: 'Libro eliminado con exito'
      })
    })
    this.router.navigate(["/catalogo"])
  }
}
