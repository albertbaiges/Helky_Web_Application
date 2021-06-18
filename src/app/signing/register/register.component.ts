import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showEmailTaken: boolean;
  constructor(private router: Router, private authService: AuthorizationService, private toastr: ToastrService) {
    this.showEmailTaken = false;
  }

  ngOnInit(): void {
  }

  register(values: any) {
    this.toastr.info('Registrando...', "", {
      timeOut: 2000,
      positionClass: "toast-bottom-full-width"
    });
    const body = {
      username: values.username,
      email: values.email,
      password: values.password
    }
    console.log("queremos registrar a", body)
    this.authService.register(body)
      .then((response: any) => {
        this.toastr.success('Usuario registrado satisfactoriamente', "", {
          timeOut: 2000,
          positionClass: "toast-bottom-full-width"
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
        } else {
          this.toastr.error(response.error, "Error", {
            timeOut: 2000,
            positionClass: "toast-bottom-full-width"
          });
        }
      });

  }


  goToLogin() {
    this.router.navigateByUrl("/login");
  }

}
