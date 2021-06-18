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
    return this.http.get(`/api/center/patients`)
    .pipe(
      map((response: any) => Object.values(response.patients))
    ).toPromise();
  }


  getMedics(): Promise<any> {
    return this.http.get(`/api/center/medics`)
    .pipe(
      map((response: any) => response.medics),
      map(medics => Object.values(medics))
    )
    .toPromise();
  }

  registerMedic(body: any) {
    console.log("enviando peticion")
    return this.http.post(`/api/center/signmedic`, body)
      .toPromise();
  }
}
