import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor( private userService: UserService) {
    console.log("Queremos mostrar el perfil del usuario", this.user);
  }
  
  ngOnInit(): void {
    console.log("dentro del init el valor vale", this.user)
    // this.userService.getUser("2")
    //   .then(response => {
    //     this.patient = response;
    //   });
  }
}
