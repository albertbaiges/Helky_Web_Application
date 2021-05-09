import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearcherService {

  constructor(private http: HttpClient) { }


  search(data: any): Promise<any> {
    return this.http.get("/api/search/", {
      params: data
    })
    .pipe(
      map((response: any) => response.users)
    )
    .toPromise();
  }
}
