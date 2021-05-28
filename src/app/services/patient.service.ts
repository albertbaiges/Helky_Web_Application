import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getMedicines(): Promise<any> {
    console.log("pidiendo con esto")
    return this.http.get(`/api/patient/medicines`)
    .pipe(
      tap(response => console.log(response)),
      map((response: any) => response.medicines)
    )
    .toPromise();
  }

  getDisorders(): Promise<any> {
    return this.http.get(`/api/patient/disorders`)
    .pipe(
      map((response: any) => response.disorders),
      map(disorders => Object.values(disorders))
    )
    .toPromise();
  }

  getMedics(): Promise<any> {
    return this.http.get(`/api/patient/medics`)
    .pipe(
      map((response: any) => response.medics),
      map(medics => Object.values(medics))
    )
    .toPromise();
  }


  getCenters(): Promise<any> {
    return this.http.get(`/api/patient/centers`)
    .pipe(
      map((response: any) => response.centers),
      map(centers => Object.values(centers))
    )
    .toPromise();
  }

  createRegister(data: any) {
    return this.http.post(`/api/registers`, data).toPromise();
  }

  updatePatient(data: any) {
    return this.http.patch(`/api/patient`, data).toPromise();
  }
}
