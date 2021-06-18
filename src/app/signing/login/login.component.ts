import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidPassword: boolean;
  notRegistered: boolean;

  constructor(private authService: AuthorizationService, private router: Router) {
    this.invalidPassword = false;
  }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    const {email, password} = form.value;
    if(email === "" || password === "") {
      return
    }

    this.authService.login(email, password)
      .then(response => {
        this.router.navigateByUrl("/home");
      })
      .catch(error => {
        console.log(error)
        if (error.status === 401) {
          console.log("entramos aqui")
          this.invalidPassword = true;
          setTimeout(() => {this.invalidPassword = false}, 1000 * 3);
        } else if (error.status === 400) {
          this.notRegistered = true;
          setTimeout(() => {this.notRegistered = false}, 1000 * 3);
        }
      });
  }

  goTo(path: string) {
    this.router.navigateByUrl(path);
  }

}
