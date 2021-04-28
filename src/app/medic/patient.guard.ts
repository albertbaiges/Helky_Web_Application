import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientInfoService } from './services';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {


  constructor(private router: Router, private patientInfo: PatientInfoService) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("Podemos ir a la zona?", Boolean(this.patientInfo.patient));
      if(Boolean(this.patientInfo.patient)) {
        return true;
      } else {
        console.log("Ha de seleccionar un paciente");
        this.router.navigateByUrl('/medic/patients');
        return false;
      }
    }
  
}
