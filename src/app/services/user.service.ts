
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  private user$: Subject<User>;

  //Quitar todo esto de aqui y mandarlo usar el de auth
  constructor(private http: HttpClient) { 
    this.user$ = new Subject<User>();
  }

  setUser(user: User): void {
    console.log("The user has been set");
    
    this.user = user;
    this.user$.next(user);
  }

  getUserObservable(): Observable<User> {
    return this.user$.asObservable();
  }

  getUser(userID: string): Promise<any> {
  //usar el http client
    return this.http.get(`/api/users/${userID}`).toPromise();
  }

}
