import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css']
})
export class MedicsComponent implements OnInit {
  medics: Array<any>;

  constructor(private router: Router, private userService: UserService) {
    this.medics = [];
  }
  
  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.medics = await this.userService.getMedics();
    console.log("mis medicos", this.medics)
  }


  goBack() {
    this.router.navigateByUrl("/home");
  }

}
