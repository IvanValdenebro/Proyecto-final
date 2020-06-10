import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { Usuario } from 'src/app/Modelo/Usuario';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
import { Prestamo } from 'src/app/Modelo/Prestamo';
import jsPDF from 'jspdf'
import 'jspdf-autotable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('iniciarsesion')iniciarSesion:ModalDirective;

  @ViewChild('crearsesion')crearSesion:ModalDirective;

  validatingForm: FormGroup;

  prestamos:Prestamo[];

  usuario:Usuario = new Usuario();
  
  role: string;
  
  constructor(private router:Router, private service:BackendService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.validatingForm = new FormGroup({
      signupFormModalName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', Validators.email),
      signupFormModalPassword: new FormControl('', Validators.required),
      
    });
  }

  get signupFormModalName() {
    return this.validatingForm.get('signupFormModalName');
  }

  get signupFormModalEmail() {
    return this.validatingForm.get('signupFormModalEmail');
  }

  get signupFormModalPassword() {
    return this.validatingForm.get('signupFormModalPassword');
  }
  guardar(){
    console.log(this.usuario)
    this.service.createUsuario(this.usuario)
    .subscribe(data=>{
      Swal.fire({
        icon: 'success',
        text: 'Se creó con exito'
      })
    })
  }
  logear(){
    this.service.iniciarSesion(this.usuario)
    .subscribe(data=>{       
    console.log(data)
    if(data===null){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario no encontrado'
            })
      }else{
        this.usuario=data;
        if(this.usuario.role==false){
          localStorage.setItem("role","admin")
          console.log(localStorage.getItem("role")) 
          var id = this.usuario.id;            
          localStorage.setItem("usuarioId",id.toString())  
          this.iniciarSesion.hide();
          Swal.fire({
            icon: 'success',
            text: 'Sesión iniciada'
          })
          this.router.navigate(["/"])
          }else{
            localStorage.setItem("role","usuario")
            console.log(localStorage.getItem("role"))
            var id = this.usuario.id;            
            localStorage.setItem("usuarioId",id.toString())            
          this.iniciarSesion.hide();
          Swal.fire({
            icon: 'success',
            text: 'Sesión iniciada'
          })
          this.router.navigate(["/"])
      }
      
    }
    })
    this.ngOnInit();
  }
  descargarPdf(){
    var body = [];
    var head = [['Titulo', 'IdLibro', 'idUsuario', 'FechaRecogida','FechaDevolución']]
    this.service.getPrestamo().subscribe(data =>{
      this.prestamos = data;
      this.prestamos.forEach(prestamo => {
        let array = [prestamo.titulo,prestamo.idLibro, prestamo.idUsuario, prestamo.fechaRecogida,prestamo.fechaDevolucion]
        body.push(array);
      })
      var doc = new jsPDF();
      doc.text(7, 15, "Listado de productos");
      doc.autoTable({ head: head, body: body , startY: 20, margin: {horizontal: 7}})
      doc.save('biblioteca.pdf')
    });
  }
}