import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../models/Usuario';
import { Prestamo } from '../models/Prestamo';
import { Libro } from '../models/Libro';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }

  Url='http://localhost:8080/ProyectoFinal/usuario';
  UrlLibro='http://localhost:8080/ProyectoFinal/libro';
  UrlPrestamo='http://localhost:8080/ProyectoFinal/prestamo';
  UrlSesion='http://localhost:8080/ProyectoFinal/iniciarSesion';

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
