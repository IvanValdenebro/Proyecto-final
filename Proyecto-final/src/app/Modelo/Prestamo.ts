import { Time } from '@angular/common';

export class Prestamo{
    id:number;
    idLibro:number;
    idUsuario:number;
    alquilado:boolean;
    fechaRecogida:Date;
    fechaDevolucion:Date;
    titulo:String;
    usuario:String;
}