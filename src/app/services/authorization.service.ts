import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from "rxjs/operators";
import { User } from '../models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  username$: Subject<string>;

  constructor(private http: HttpClient, private userService: UserService) {
    console.log("service loaded");
    this.username$ = new Subject<string>();
  }



  // private storeUser(userData: any) {
  //   console.log("Insiside the tap we obtain", userData);
  //   if(userData.error) {
  //     console.log(userData.error);
  //   } else {
  //     console.log("service", this.userService)
  //     console.log("service", this.http)
  //     localStorage.setItem("auth", JSON.stringify(userData.authorization));
  //   }
  // }
  //! NEEDS TO BECOME AN ARROW FUNCTION FOR LEXICAL BINDING, IT WILL BE CALLED FROM ANOTHER FUNCTION tap()....
  storeUser = (userData: any) => {
      console.log("Insiside the tap we obtain", userData);
    if(userData.error) {
      console.log(userData.error);
    } else {
      this.userService.setUser(userData);
      this.username$.next(userData.username);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }

  getLocalUser(): User {
    console.log("Cheking if there is an user")
    const authJSON = localStorage.getItem("user");
    console.log(authJSON)
    return authJSON ? JSON.parse(authJSON) : null;
  }



  async login(username: string, password: string) {
    const body = {
      username,
      password
    }
    return await this.http.post("/login", body)
      .pipe(tap(this.storeUser)).toPromise();
  }

  logout() {
    localStorage.removeItem("user");
  }

  register() {

  }
}
