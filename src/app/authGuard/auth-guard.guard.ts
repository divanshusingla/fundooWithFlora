import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from '../services/authService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

constructor(@Inject(AuthServiceService) private auth : AuthServiceService,@Inject(Router) private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.isLoggednIn())
      {
        // tokne is available as it is stored in the local stotage while user is logging in
    return true;
      }

      else{
        alert("unauthoried Access,You have to login first")
        this.router.navigate(["/login"]);
        return false;
      }
  }
}
