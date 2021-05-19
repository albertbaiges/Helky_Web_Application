import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';


@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css']
})
export class CentersComponent implements OnInit {
  centers: Array<any>;

  constructor(private router: Router, private patientService: PatientService) {
    this.centers = [];
  }
  
  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.centers = await this.patientService.getCenters();
  }


  goBack() {
    this.router.navigateByUrl("/home");
  }

}
