import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(private http: HttpClient) { }

  getMeals(patientID: string): Promise<any> {
    return this.http.get(`/api/mealplans/${patientID}`)
    .pipe(
      tap(response => console.log("Obtenemos esta respuesta de las comidas", response)),
      map((response: any) => Object.values(response.weekdays))
    )
    .toPromise();
  }

  getMealInfo(patientID: string, day: string, slot: string) {
    return this.http.get(`/api/mealplans/${patientID}`, {params: {
      day,
      slot
    }})
      .pipe(
        map((response: any) => response.weekdays[day])
      )
      .toPromise();
  }

  updateMeal(mealID: string, data: any) {
    return this.http.post(`/api/mealplans/${mealID}`, data).toPromise();
  }
}
