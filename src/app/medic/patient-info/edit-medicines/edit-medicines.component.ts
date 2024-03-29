import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MedicService } from 'src/app/services/medic.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-edit-medicines',
  templateUrl: './edit-medicines.component.html',
  styleUrls: ['./edit-medicines.component.css']
})
export class EditMedicinesComponent implements OnInit {

  hideReason: "success" | "cancel";
  patientID: string;
  medicines: Array<any>;
  promptModal: BsModalRef;

  constructor(public bsModalRef: BsModalRef, private medicService: MedicService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
  }


  promptApply(template: TemplateRef<any>) { //! Maybe call it create... as well
    this.promptModal = this.modalService.show(template);
  }

  apply() {
    //Perform the service request
    const medicines = this.medicines.map(medicine => medicine.nregistro);

    this.medicService.updatePatient(this.patientID, medicines)
      .then((response: any) => {
        this.medicines = response.medicines;
        this.modalService.hide();
        this.hideReason="success";
      })
  }

  cancel() {
    console.log("Cancelado!")
    this.promptModal.hide();
  }

  discard() {
    console.log("Descartado!")
    this.modalService.hide();
  }


  promptDiscard(template: TemplateRef<any>) {
    this.promptModal = this.modalService.show(template);
  }

  closeModal() {
    console.log("closing")
    this.bsModalRef.hide();
  }

  addMedicine(medicine: any) {
    this.medicines.push(medicine);
    console.log(this.medicines);
  }

  removeMedicine(medicine: any) {
    const index = this.medicines.indexOf(medicine);
    this.medicines.splice(index, 1);
    console.log(this.medicines);
  }
}
