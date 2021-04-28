import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MealsService } from 'src/app/services/meals.service';
import { DayMealsModel } from '../models/DayMealsModel';

@Component({
  selector: 'app-meal-modal',
  templateUrl: './meal-modal.component.html',
  styleUrls: ['./meal-modal.component.css']
})
export class MealModalComponent implements OnInit {

  patientID: string;
  day: string;
  timezone: string;
  info: any;

  mealInfo: any; //Meal information model

  hideReason: "success" | "cancel";

  constructor(public bsModalRef: BsModalRef, private mealsService: MealsService) {
    this.hideReason = "cancel";
  }

  ngOnInit(): void {
    console.log("requesting for", this.day, this.timezone)
    this.mealsService.getMealInfo(this.patientID, this.day, this.timezone).then((response: any) => {
      console.log("La información obtenida es", response)
      this.mealInfo = response;
      this.mealInfo = (response.constructor === Object && Object.keys(response).length !== 0)? response : null;
    }); 
  }

  closeModal() {
    console.log("closing")
    this.bsModalRef.hide();
  }
}
