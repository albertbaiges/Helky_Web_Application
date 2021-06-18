import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PlansService } from 'src/app/services/plans.service';

@Component({
  selector: 'app-exercises-modal',
  templateUrl: './exercises-modal.component.html',
  styleUrls: ['./exercises-modal.component.css']
})
export class ExercisesModalComponent implements OnInit {

  planID: string;
  day: string;
  activitiesInfo: any; //Meal information model

  editable: boolean;

  @ViewChild("exercises") private exercises: ElementRef;
  @ViewChild("comments") private comments: ElementRef;


  constructor(private bsModalRef: BsModalRef, private plansService: PlansService) { }

  ngOnInit(): void {
    this.plansService.getExerciseInfo(this.planID, this.day).then(response => {
      this.activitiesInfo = (response.constructor === Object && Object.keys(response).length !== 0)? response : ({
        day: this.day,
        activities: {
          exercises: "",
          comments: ""
        }
      });

      if(this.activitiesInfo.activities.constructor !== Object || Object.keys(this.activitiesInfo.activities).length === 0) {
        this.activitiesInfo.activities = {
          exercises: "",
          comments: ""
        }
      }
      console.log("informacion de actividades", this.activitiesInfo)
    });
  }

  closeModal() {
    this.bsModalRef.hide();
  }


  toggleEdit() {
    this.editable = !this.editable;
  }

  applyChanges(info: any) {
    console.log("queremos hacer los cambios", info)
    const body = {
      day: this.day,
      activities: info
    }

    this.plansService.updateExercises(this.planID, body).then((response: any) => {
      this.activitiesInfo.activities = response[this.day].activities;
      this.editable = false;
    });
  }

  rejectChanges() {
    this.editable = false;
    this.exercises.nativeElement.innerText = this.activitiesInfo.activities.exercises;
    this.comments.nativeElement.innerText = this.activitiesInfo.activities.comments;
  }
}
