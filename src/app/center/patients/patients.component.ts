import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CenterService } from '../services/center.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients: any;

  constructor(private router: Router, private centerService: CenterService) { }

  ngOnInit(): void {
    this.centerService.getPatients()
      .then(patients => this.patients = patients);
  }


  goBack() {
    this.router.navigateByUrl("/center");
  }
}
