import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getUser(userID: string): Promise<any> {
    return this.http.get(`/api/users/${userID}`)
      .toPromise();
  }
}
