import { Time } from '@angular/common';

export class Prestamo{
    id:number;
    idLibro:number;
    idUsuario:number;
    alquilado:boolean;
    fechaRecogida:Time;
    fechaDevolucion:Time;
    titulo:String;
    usuario:String;
}