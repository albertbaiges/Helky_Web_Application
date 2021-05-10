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

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
  }

  async login(form: NgForm) {
    const {username, password} = form.value;
    if(username === "" || password === "") {
      return
    }

    const response = await this.authService.login(username, password);
    this.router.navigateByUrl("/home");
  }


  goToRegister() {
    this.router.navigateByUrl("/signup");
  }

}
