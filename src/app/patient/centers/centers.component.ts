import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css']
})
export class CentersComponent implements OnInit {
  centers: Array<any>;

  constructor(private router: Router, private userService: UserService) {
    this.centers = [];
  }
  
  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.centers = await this.userService.getCenters();
  }


  goBack() {
    this.router.navigateByUrl("/home");
  }

}
