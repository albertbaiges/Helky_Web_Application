import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistersService {
  private reqRegisterID: string;
  constructor(private http: HttpClient) { 
    this.reqRegisterID = "";
  }

  setRegisterID(id: string) {
    this.reqRegisterID = id;
  }

  getRegisterTracking(registerID: string) {
    return this.http.get(`/api/registers/${registerID}/tracking`).toPromise();
  }

  createRegister(disorder: string): Promise<any> {
    const body = {
      patientID: "1",//! This will get the patientID that is logged in
      disorder
    }
    console.log("requesting register....")
    return this.http.post("/api/registers", body).toPromise();
  }

  
}
