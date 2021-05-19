import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css']
})
export class MedicsComponent implements OnInit {
  medics: Array<any>;

  constructor(private router: Router, private patientService: PatientService) {
    this.medics = [];
  }
  
  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.medics = await this.patientService.getMedics();
    console.log("mis medicos", this.medics)
  }


  goBack() {
    this.router.navigateByUrl("/home");
  }

}
