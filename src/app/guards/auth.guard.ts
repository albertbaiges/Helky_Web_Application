import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthorizationService,
    private userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.authService.getLocalUser();
      if(user) {
        const {authorization: auth} = user;
        if(this.isValid(auth.iat) && auth.jwt) {
          this.userService.setUser(user); //! QUIZA ES MEJOR MOVERLO AL AUTHSERVICE JUNTO CON EL CHECKING DE VALIDEZ
          console.log("Eveything is valid", auth.jwt);
          this.authService.username$.next(user.username);
          return true;
        } else {
          console.log("There is no token or it has expired");
          this.router.navigateByUrl("/login");
          localStorage.removeItem("auth");
          return false;
        }
      } else {
        console.log("There is nothing about authorization")
        this.router.navigateByUrl("/login");
        return false;
      }
  }

  private isValid(iat: number) {
    if(!iat) {
      return true;
    }
    
    const expiration = iat + 24 * 60 * 60 * 1000;
    return Date.now() < expiration;
  }
  
}
