import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  
  
  validatingForm: FormGroup;
  

  constructor() { }

  ngOnInit() {
    let x : number;
    x=0;
    if (x=0){
     localStorage.setItem("idLibro",null)
     localStorage.setItem("role",null)
     localStorage.setItem("idPrestamo",null)
     localStorage.setItem("usuarioId",null)
     localStorage.setItem("id",null)
    }else{
      console.log("funciona maquina")
    }
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
  
}