import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private http: HttpClient) { }

  getMeals(patientID: string): Promise<any> {
    return this.http.get(`/api/plans/${patientID}/meals`)
    .pipe(
      tap(response => console.log("Obtenemos esta respuesta de las comidas", response)),
      map((response: any) => Object.values(response.weekdays))
    )
    .toPromise();
  }

  getMealInfo(patientID: string, day: string, slot: string) {
    return this.http.get(`/api/plans/${patientID}/meals`, {params: {
      day,
      slot
    }})
      .pipe(
        map((response: any) => response.weekdays[day])
      )
      .toPromise();
  }

  updateMeal(mealID: string, data: any) {
    return this.http.patch(`/api/plans/${mealID}/meals`, data).toPromise();
  }

  getMedicines(planID: string): Promise<any>  {
    return this.http.get(`/api/plans/${planID}/medicines`)
    .pipe(
      map((response: any) => Object.values(response.weekdays)),
    ).toPromise();
  }

  updateMedicines(planID: string, data: any) {
    return this.http.patch(`/api/plans/${planID}/medicines`, data)
    .pipe(
      tap(response => console.log("respuesta del server", response))
    ).toPromise();
  }

  getExercises(planID: string): Promise<any>  {
    return this.http.get(`/api/plans/${planID}/activities`)
    .pipe(
      map((response: any) => Object.values(response.weekdays))
    )
      .toPromise();
  }

  getExerciseInfo(planID: string, day: string): Promise<any> {
    return this.http.get(`/api/plans/${planID}/activities`, {
      params: {
        day
      }
    })
    .pipe(
      map((response: any) => response.weekdays[day])
    )
    .toPromise();
  }

  updateExercises(planID: string, data: any) {
    return this.http.patch(`/api/plans/${planID}/activities`, data).toPromise();
  }

}
