import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';
import { MedicinesPlanComponent } from 'src/app/shared/components/medicines-plan/medicines-plan.component';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  medicines: any;
  bsModalRef: BsModalRef;
  user: any;

  constructor(private router: Router, private userService: UserService ,private modalService: BsModalService) {
    this.userService.getMedicines().then(medicines => {this.medicines = medicines; console.log(this.medicines)})
    this.userService.getUser().then(user => this.user = user);
  }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigateByUrl("/home");
  }

  medicinesCalendar() {
    const modalOptions = {
      animated: true,
      class: 'modal-dialog-centered modal-lg',
      backdrop: true,
      keyboard: true,
      initialState: {
        planID: this.user.userID,
        patient: this.user
      }
    }
    this.bsModalRef = this.modalService.show(MedicinesPlanComponent, modalOptions);
    this.bsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
      if (this.bsModalRef?.content.hideReason === "success") {
        //! what now?
      }
    });
  }

}
