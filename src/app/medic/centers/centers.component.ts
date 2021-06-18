import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicService } from 'src/app/services/medic.service';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css']
})
export class CentersComponent implements OnInit {

  centers: Array<any>;

  constructor(private router: Router, private medicService: MedicService) {
    this.centers = [];
  }
  
  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.centers = await this.medicService.getCenters();
  }


  goBack() {
    this.router.navigateByUrl("/medic");
  }

}
