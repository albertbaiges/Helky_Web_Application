import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  constructor(private http: HttpClient, private autService: AuthorizationService) { }

  getPatients(): Promise<any> {
    return this.http.get(`/api/centers/${this.autService.user.userID}/patients`)
      .pipe(
        map((response: any) => response.patients),
        map(patients => Object.values(patients))
      )
      .toPromise();
  }


  getMedics(): Promise<any> {
    return this.http.get(`/api/centers/${this.autService.user.userID}/medics`)
      .pipe(
        map((response: any) => response.medics),
        map(medics => Object.values(medics))
      )
      .toPromise();
  }

  registerMedic(body: any) {
    console.log("enviando peticion")
    return this.http.post(`/api/centers/${this.autService.user.userID}/signmedic`, body)
      .toPromise();
  }
}
