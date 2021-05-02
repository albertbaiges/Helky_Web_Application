import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  medicines: any;

  constructor(private router: Router, private userService: UserService) {
    this.userService.getMedicines().then(medicines => {this.medicines = medicines; console.log(this.medicines)})
  }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigateByUrl("/home");
  }

}
