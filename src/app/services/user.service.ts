
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

  getUser() {
    return this.http.get(`/api/users/${this.authService.user.userID}`)
    .toPromise();
  }

  getMedicines(): Promise<any> {
    return this.http.get(`/api/medicines/${this.authService.user.userID}`)
    .pipe(
      map((response: any) => response.medicines)
    )
    .toPromise();
  }

  getDisorders(): Promise<any> {
    console.log(this.authService.user.userID)
    return this.http.get(`/api/users/${this.authService.user.userID}/disorders`)
    .pipe(
      map((response: any) => response.disorders)
    )
    .toPromise();
  }

  getMedics(): Promise<any> {
    console.log(this.authService.user.userID)
    return this.http.get(`/api/users/${this.authService.user.userID}/medics`)
    .pipe(
      map((response: any) => response.medics)
    )
    .toPromise();
  }

  getCenters(): Promise<any> {
    console.log(this.authService.user.userID)
    return this.http.get(`/api/users/${this.authService.user.userID}/centers`)
    .pipe(
      map((response: any) => response.centers)
    )
    .toPromise();
  }

  updateUser(data: any): Promise<any> {
    return this.http.patch(`/api/users/${this.authService.user.userID}`, data)
    .toPromise();
  }

}
