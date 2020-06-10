import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const currentUser = localStorage.getItem('role');
    if (localStorage.getItem('role')=='admin'){      
      return true;
    }else{
      this.router.navigate(['/inicio'])
      return false;
    }
  }
  }
  

