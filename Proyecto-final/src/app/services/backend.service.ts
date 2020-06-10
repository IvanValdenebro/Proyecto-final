import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../Modelo/Usuario';
import { Libro } from '../Modelo/Libro';
import { Prestamo } from '../Modelo/Prestamo';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }

  Url='https://ivane-biblioteca.herokuapp.com/ProyectoFinal/usuario';
  UrlLibro='https://ivane-biblioteca.herokuapp.com/ProyectoFinal/libro';
  UrlPrestamo='https://ivane-biblioteca.herokuapp.com/ProyectoFinal/prestamo';
  UrlSesion='https://ivane-biblioteca.herokuapp.com/ProyectoFinal/iniciarSesion';

  getUsuario(){
    return this.http.get<Usuario[]>(this.Url)
  }
  createUsuario(usuario:Usuario){
    return this.http.post<Usuario>(this.Url,usuario)
  }
  createPrestamo(prestamo:Prestamo){
    return this.http.post<Prestamo>(this.UrlPrestamo,prestamo)
  }
 
  getLibro(){
    return this.http.get<Libro[]>(this.UrlLibro+"/stock")
  }
  getLibroId(id:number){
    return this.http.get<Libro>(this.UrlLibro+"/listar/"+id)
  }
  updateLibro(libro:Libro){
    return this.http.put<Libro>(this.UrlLibro+"/editar/"+libro.id,libro)
  }
  updatePrestamo(prestamo:Prestamo){
    return this.http.put<Prestamo>(this.UrlPrestamo+"/editar/"+prestamo.alquilado,prestamo)
  }
  getPrestamo(){
    return this.http.get<Prestamo[]>(this.UrlPrestamo)
  }
  getPrestamoId(id:number){
    return this.http.get<Prestamo[]>(this.UrlPrestamo+"/devolver/"+id)
  }
  getPrestamoIdUsuario(id:number){
    return this.http.get<Prestamo>(this.UrlPrestamo+"/listar/"+id)
  }
  createLibro(libro:Libro){
    return this.http.post<Libro>(this.UrlLibro,libro)
  }
  deleteLibro(libro:Libro){
    return this.http.delete<Libro>(this.UrlLibro+"/"+libro.id)
  }
  iniciarSesion(usuario:Usuario){
    return this.http.get<Usuario>(this.UrlSesion+"/"+usuario.name+"/"+usuario.password)
  }
}
