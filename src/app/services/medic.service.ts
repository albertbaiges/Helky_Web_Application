import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/Patient';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  constructor(private http: HttpClient, private authService: AuthorizationService) { }

  getPatients(): Promise<Array<Patient>> {
    return this.http.get(`/api/medic/patients`)
    .pipe(
      map((response: any) => Object.values(response.patients) as Array<Patient>)
    ).toPromise();
  }

  updatePatient(userID: string, medicines: any) {
    return this.http.patch("/api/medic/patients", {userID, medicines}).toPromise();
  }

  getCenters(): Promise<any> {
    return this.http.get(`/api/medic/centers`)
    .pipe(
      map((response: any) => response.centers),
      map(centers => Object.values(centers))
    )
    .toPromise();
  }
}
