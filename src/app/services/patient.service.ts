import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  updatePatient(patientID: string, data: any) {
    console.log("Queremos actualizar", patientID, "y asignarle", data)
    return this.http.patch(`/api/patients/${patientID}`, data).toPromise();
  }
}
