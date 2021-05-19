import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';
import { MedicinesPlanComponent } from 'src/app/shared/components/medicines-plan/medicines-plan.component';
import { EditMedicinesComponent } from '../edit-medicines/edit-medicines.component';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  medicines: any;
  bsModalRef: BsModalRef;
  editModalRef: BsModalRef;
  user: any;

  constructor(private router: Router, private userService: UserService, private patientService: PatientService ,private modalService: BsModalService) {
    this.patientService.getMedicines().then(medicines => {this.medicines = medicines; console.log(this.medicines)})
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

  editMedicines() {
    const modalOptions = {
      animated: true,
      class: 'modal-dialog-centered modal-lg',
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        patientID: this.user.userID,
        medicineCodes: this.medicines
      }
    }

    this.editModalRef = this.modalService.show(EditMedicinesComponent, modalOptions);
    this.editModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
      if (this.editModalRef?.content.hideReason === "success") {
        this.medicines = this.editModalRef.content.medicines;
        console.log("medicamentos actualizados", this.medicines)
        this.user.medicines = [...this.medicines]
      }
    });
  }

}
