import { Component } from '@angular/core';
import { Libro } from '../models/Libro';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  libros: Libro[];
  constructor(private service: BackendService, private router: Router) {}

  ngOnInit(): void {

}
}
