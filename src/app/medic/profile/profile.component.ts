import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  emailTaken: boolean;
  constructor(private router: Router, private userService: UserService, private authService: AuthorizationService) {
    this.userService.getUser().then(user => {this.user = user});
    this.emailTaken = false;
  }

  ngOnInit(): void {
  }

  submitProfile(data: any) {
    this.userService.updateUser(data)
     .then((response: any) => {
        this.authService.updateUser(response);
     })
     .catch(errorResponse => {
       if (errorResponse.status === 400 && errorResponse.error.Error === "Email already taken") {
         this.emailTaken = true;
         setTimeout(() => {this.emailTaken = false}, 1000 * 3);
       }
     })
  }

  submitDisorders(values: any) {
    console.log("datos a actualizar", values);

  }

  submitPassword(values: any) {
    console.log("datos a actualizar", values);
    const data = {
      password: values.password
    }

    this.userService.updateUser(data)
     .then((response: any) => console.log(response))
    //mostrar popup con mensaje de se han actualizado datos

    //si se cambia el nombre hay que actualizar el jwt y cambiar el usuario de authService
  }

  

  goBack() {
    this.router.navigateByUrl("/medic");
  }
}
