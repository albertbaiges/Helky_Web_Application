import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authService: AuthorizationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const {utype} = this.authService.user;
      console.log("Usuario de tipo", utype);
      const path = state.url.split("/");
      console.log(path)
      if(utype === "medic" && path[1] !== "medic") {
        this.router.navigateByUrl("/medic");
        return false;
      } else if (utype === "center" && path[1] !== "center") {
        this.router.navigateByUrl("/center");
        return false;
      } else if (utype === "patient" && (path[1] === "medic" || path[1] === "center")) {
        this.router.navigateByUrl("/home");
        return false
      }
      return true;
  }
  
}
