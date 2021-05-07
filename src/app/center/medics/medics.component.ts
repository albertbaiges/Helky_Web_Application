import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CenterService } from '../services/center.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css']
})
export class MedicsComponent implements OnInit {
  medics: any;

  constructor(private router: Router, private centerService: CenterService) { }

  ngOnInit(): void {
    this.centerService.getMedics()
      .then(medics => this.medics = medics);
  }

  goBack() {
    this.router.navigateByUrl("/center");
  }
}
