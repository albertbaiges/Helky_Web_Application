import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_URL} from "../shared/toRemove";
import { catchError } from "rxjs/operators"
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) {
    console.log("home component created")
  }

  ngOnInit(): void {
  }

  goTo(url: string) {
    this.router.navigateByUrl(url);
  }

  isMedic() {
    console.log("El usuario a mirar es", this.userService.user.utype);
    console.log("is medic?", this.userService.user.utype === "medic")
    return this.userService.user.utype === "medic";
  }
}
