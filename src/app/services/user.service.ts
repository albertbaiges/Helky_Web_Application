
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
    return this.http.get(`/api/user`)
    .toPromise();
  }


  updateUser(data: any): Promise<any> {
    return this.http.patch(`/api/user`, data)
    .toPromise();
  }

  getNotifications() {
    return this.http.get(`/api/user/notifications`)
    .pipe(
      map((response: any) => response.notifications)
    )
    .toPromise();
  }

  postRelation(body: any) {
    return this.http.post(`/api/user/relations`, body).toPromise();
  }

}
