import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: any;

  constructor(private router: Router, private userService: UserService) {
    this.userService.getUser().then(user => {this.user = user, console.log(user)});
  }

  ngOnInit(): void {
  }

  submit(values: any) {
    console.log("datos a actualizar", values);
    //Valirdar contraseñas iguales, seguras, etc
    
    //enviar cambios

    //recibir cambios

    //mostrar popup con mensaje de se han actualizado datos

    //si se cambia el nombre hay que actualizar el jwt y cambiar el usuario de authService
  }

  goBack() {
    this.router.navigateByUrl("/home");
  }
}
