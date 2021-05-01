import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MealsService } from 'src/app/services/meals.service';
import { MealModalComponent } from '../meal-modal/meal-modal.component';
import { DayMealsModel } from '../models/DayMealsModel';
import { WeekMealsModel } from '../models/WeekMealsModel';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  private weekdaysMap: any;
  weekDays: Array<string>;
  weekDaysEn: Array<string>;
  weekMeals: WeekMealsModel; //DayMealsModel[]
  @Input() patientID: string;

  bsModalRef: BsModalRef;


  constructor(private mealsService: MealsService, private modalService: BsModalService) {
    this.weekdaysMap = {
      monday: 0,
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 4,
      saturday: 5,
      sunday: 6
    }
    this.weekDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    this.weekDaysEn = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    this.weekMeals = {breakfasts: [], lunches: [], dinners: []}
  }

  ngOnInit(): void {
    this.mealsService.getMeals(this.patientID).then((weekMeals: DayMealsModel[]) => {
      console.log(weekMeals);
      for (const dayMeals of weekMeals) {
        console.log(dayMeals)
        const dayPos = this.weekdaysMap[dayMeals.day!];
        this.weekMeals.breakfasts[dayPos] = dayMeals.breakfast;
        this.weekMeals.lunches[dayPos] = dayMeals.lunch;
        this.weekMeals.dinners[dayPos] = dayMeals.dinner;
      }
      console.log("las comidas para esta semana son", this.weekMeals)
    });
  }

  editSlot(event: MouseEvent) {
    const element = event.target as Element;
    const day = element.getAttribute("data-day");
    const zone = element.getAttribute("data-zone");
    if(day && zone) {
      console.log(day, zone)
      const modalOptions = {
        animated: true,
        class: 'modal-dialog-centered modal-lg',
        backdrop: true,
        keyboard: true,
        initialState: {
          patientID: this.patientID,
          timezone: zone, //! Better; rename 
          day
        }
      }
      this.bsModalRef = this.modalService.show(MealModalComponent, modalOptions);
      this.bsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
        const dayPos = this.weekdaysMap[this.bsModalRef.content.day!];
        switch(this.bsModalRef.content.timezone) {
          case "breakfast":
            this.weekMeals.breakfasts[dayPos] = this.bsModalRef.content.mealInfo.menu;
            break;
          case "lunch":
            this.weekMeals.lunches[dayPos] = this.bsModalRef.content.mealInfo.menu;
            break;
          case "dinner": 
            this.weekMeals.dinners[dayPos] = this.bsModalRef.content.mealInfo.menu;
            break;
        }

        console.log(this.weekMeals)
      });

    }
  }
}
