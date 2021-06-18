import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CenterService } from '../services/center.service';

@Component({
  selector: 'app-register-medic',
  templateUrl: './register-medic.component.html',
  styleUrls: ['./register-medic.component.css']
})
export class RegisterMedicComponent implements OnInit {

  showEmailTaken: boolean;

  constructor(private router: Router, private centerService: CenterService,
    private toastr: ToastrService) {
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
      .then((response: any) => {
        this.toastr.success('Médico registrado satisfactoriamente', "", {
          timeOut: 2000,
          positionClass: "toast-top-right"
        });
      })
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
