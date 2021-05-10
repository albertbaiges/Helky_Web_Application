import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistersService {
  
  reqRegisterID: string;
  constructor(private http: HttpClient) { 
    this.reqRegisterID = "";
  }

  setRegisterID(id: string) {
    this.reqRegisterID = id;
  }

  getRegisterTracking(registerID: string, params?: any) {
    console.log("peticion enviada")
    if (params) {
      console.log("parametros", params)
      return this.http.get(`/api/registers/${registerID}/tracking`, {
        params
      }).toPromise();
    } else {
      return this.http.get(`/api/registers/${registerID}/tracking`).toPromise();
    }
  }

  createRegister(disorder: string): Promise<any> {
    const body = {
      patientID: "1",//! This will get the patientID that is logged in
      disorder
    }
    console.log("requesting register....")
    return this.http.post("/api/registers", body).toPromise();
  }


  getSupportedRegisters() {
    return this.http.get(`/api/registers/supported`).toPromise();
  }

  addRegister(registerID: string, body: any) {
    console.log("peticion", registerID, body)
    return this.http.patch(`/api/registers/${registerID}/tracking`, body)
      .toPromise();
  }
  
}
