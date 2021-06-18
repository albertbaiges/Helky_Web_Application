import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from "rxjs/operators";
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  username$: Subject<string>;
  user: any;

  constructor(private http: HttpClient) {
    console.log("service loaded");
    this.username$ = new Subject<string>();
  }


  updateUser(user: any) {
    const authJSON = localStorage.getItem("user");
    const auth = JSON.parse(authJSON!);
    if (user.username && user.username !== auth.username) {
      console.log("actualizando el username")
      auth.username = user.username;
    } 
    localStorage.setItem("user", JSON.stringify(auth));
    this.username$.next(auth.username);
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
      this.user = userData;
      console.log(this.user)
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



  async login(email: string, password: string) {
    const body = {
      email,
      password
    }
    return await this.http.post("/login", body)
      .pipe(tap(this.storeUser)).toPromise();
  }

  register(body: any) {
    return this.http.post("/signup", body)
      .toPromise();
  }

  logout() {
    localStorage.removeItem("user");
  }

}
