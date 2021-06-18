import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PlansService } from 'src/app/services/plans.service';
import { ExercisesModalComponent } from './exercises-modal/exercises-modal.component';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {


  private weekdaysMap: any;
  weekDays: Array<string>;
  weekDaysEn: Array<string>;
  weekActivities: any; //DayActivitiesModel[]

  @Input() planID: string;

  bsModalRef: BsModalRef;


  constructor(private modalService: BsModalService, private plansService: PlansService) {
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
    this.weekActivities = [];
  }

  ngOnInit(): void {
    const weekActivitiesTemp: any = []
    this.plansService.getExercises(this.planID)
      .then(weekActivities => {
        console.log(weekActivities)
        for(const dayActivities of weekActivities) {
          const dayPos = this.weekdaysMap[dayActivities.day];
          this.weekActivities[dayPos] = dayActivities;
        }
        console.log(this.weekActivities)
      });
  }

  editDayActivities(day: string) {
    const modalOptions = {
      animated: true,
      class: 'modal-dialog-centered modal-lg border-radius-modal',
      backdrop: true,
      keyboard: true,
      initialState: {
        planID: this.planID,
        day: day
      },
    }
    this.bsModalRef = this.modalService.show(ExercisesModalComponent, modalOptions);
    this.bsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
      console.log(this.bsModalRef.content)
      const day = this.bsModalRef.content.day;
      const dayPos = this.weekdaysMap[this.bsModalRef.content.day];
      this.weekActivities[dayPos] = {
        day,
        activities: this.bsModalRef.content.activitiesInfo.activities.exercises
      }
      console.log(this.weekActivities)
    });
  }

}
