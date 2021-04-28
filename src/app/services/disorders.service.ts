import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisordersService {

  constructor(private http: HttpClient) { }

  getDisordersByPatientID(patientID: string): Promise<any> {
    return this.http.get(`/api/disorders/${patientID}`).toPromise();
  }
  
}
