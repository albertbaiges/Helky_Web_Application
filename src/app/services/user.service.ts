
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthorizationService) { 
  }

  getMedicines(): Promise<any> {
    return this.http.get(`/api/medicines/${this.authService.user.userID}`)
    .pipe(
      map((response: any) => response.medicines)
    )
    .toPromise();
  }

  getDisorders() {
    console.log(this.authService.user.userID)
    return this.http.get(`/api/users/${this.authService.user.userID}/disorders`)
    .pipe(
      map((response: any) => response.disorders)
    )
    .toPromise();
  }

  getMedics() {
    console.log(this.authService.user.userID)
    return this.http.get(`/api/users/${this.authService.user.userID}/medics`)
    .pipe(
      map((response: any) => response.medics)
    )
    .toPromise();
  }

  getCenters() {
    console.log(this.authService.user.userID)
    return this.http.get(`/api/users/${this.authService.user.userID}/centers`)
    .pipe(
      map((response: any) => response.centers)
    )
    .toPromise();
  }

}
