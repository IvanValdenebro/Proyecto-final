import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:Usuario = new Usuario();
  constructor(private router:Router, private service:BackendService) { }

  ngOnInit() {
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
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Esta aplicación es solo para admins'
          })
          Swal.fire({
            icon: 'success',
            text: 'Sesión iniciada'
          })
          this.router.navigate(["/tabs"])
          }else{
            localStorage.setItem("role","usuario")
            var id = this.usuario.id;            
            localStorage.setItem("usuarioId",id.toString())  
          Swal.fire({
            icon: 'success',
            text: 'Sesión iniciada'
          })
          this.router.navigate(["/tabs"])
      }
      
    }
    })
    this.ngOnInit();
  }

}
