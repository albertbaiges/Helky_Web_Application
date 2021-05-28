import { Injectable } from '@angular/core';
import { Patient } from 'src/app/models/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientInfoService {

  patient: Patient
  constructor() { }

}
