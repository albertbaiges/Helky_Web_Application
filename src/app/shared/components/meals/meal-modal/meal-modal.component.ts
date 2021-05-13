import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PlansService } from 'src/app/services/plans.service';
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


  editable: boolean;

  mealInfo: any; //Meal information model

  //Needed for reset
  @ViewChild("menu") private menu: ElementRef;
  @ViewChild("comments") private comments: ElementRef;
  
  constructor(public bsModalRef: BsModalRef, private plansService: PlansService) {
  }

  ngOnInit(): void {
    console.log("requesting for", this.day, this.timezone)
    
    this.plansService.getMealInfo(this.patientID, this.day, this.timezone).then((response: any) => {
      console.log("La respuesta es", response)
      console.log(response.constructor === Object && Object.keys(response).length !== 0)
      this.mealInfo = (response.constructor === Object && Object.keys(response).length !== 0)? response : ({menu: "", comments: ""});
      console.log(this.mealInfo)
    }); 
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  toggleEdit() {
    this.editable = !this.editable;
  }

  applyChanges(info: any) {
    const body = {
      day: this.day,
      meal: this.timezone,
      info
    }

    //!Se puede comparar con lo que está en mealInfo y enviar solo aquellos campos nuevos
    //! o si no hay nada, cancelarlo
    this.plansService.updateMeal(this.patientID, body)
      .then((response: any) => this.mealInfo = response[this.day][this.timezone]);
    this.editable = false;
  }

  rejectChanges() {
    this.editable = false;
    this.menu.nativeElement.innerText = this.mealInfo.menu;
    this.comments.nativeElement.innerText = this.mealInfo.comments;
  }
}
