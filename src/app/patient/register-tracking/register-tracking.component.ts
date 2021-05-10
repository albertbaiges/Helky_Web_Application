import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistersService } from 'src/app/services/registers.service';

@Component({
  selector: 'app-register-tracking',
  templateUrl: './register-tracking.component.html',
  styleUrls: ['./register-tracking.component.css']
})
export class RegisterTrackingComponent implements OnInit {

  registerID: string;

  constructor(private router: Router,  private registersService: RegistersService) { }

  ngOnInit(): void {
    this.registerID = this.registersService.reqRegisterID;
  }

  goBack() {
    this.router.navigateByUrl("/home/registers");
  }

}
