import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CenterService } from '../services/center.service';

@Component({
  selector: 'app-register-medic',
  templateUrl: './register-medic.component.html',
  styleUrls: ['./register-medic.component.css']
})
export class RegisterMedicComponent implements OnInit {

  showEmailTaken: boolean;

  constructor(private router: Router, private centerService: CenterService) {
    this.showEmailTaken = false;
  }

  ngOnInit(): void {
  }


  registerMedic(values: any) {
    const body = {
      username: values.username,
      email: values.email,
      password: values.password
    }

    console.log("Queremos registrar al usuario", body)
    this.centerService.registerMedic(body)
      .then((response: any) => console.log(response))
      .catch(response => {
        if(response.error && response.error.Error) {
          if(response.error.Error === "Email in use") {
            this.showEmailTaken = true;
            setTimeout(() => {
              this.showEmailTaken = false;
            }, 1000 * 3);
          }
        }});
    
  }


  goBack() {
    this.router.navigateByUrl("/center");
  }
}
