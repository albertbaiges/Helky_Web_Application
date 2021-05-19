import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/Patient';
import { MedicService } from 'src/app/services/medic.service';
import { PatientInfoService } from '../services';

@Component({
  selector: 'app-admin-patients',
  templateUrl: './admin-patients.component.html',
  styleUrls: ['./admin-patients.component.css']
})
export class AdminPatientsComponent implements OnInit {

  patientList: Array<Patient>;

  constructor(private router: Router, private medicService: MedicService, private patientInfoService: PatientInfoService) { }

  ngOnInit(): void {
    this.medicService.getPatients().then((patients: Array<Patient>) => {
      this.patientList = patients;
      console.log(this.patientList)
    });
  }

  goToInfo(patient: Patient) {
    this.patientInfoService.patient = patient;
    this.router.navigateByUrl("/medic/patient/administrate");
  }

  goBack() {
    this.router.navigateByUrl("/medic");
  }


}
