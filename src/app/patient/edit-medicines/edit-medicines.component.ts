import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MedicinesCimaService } from 'src/app/services/medicines-cima.service';
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
  medicineCodes: Array<string>

  constructor(public bsModalRef: BsModalRef, private patientService: PatientService,
              private modalService: BsModalService, private cima: MedicinesCimaService) { }

  ngOnInit(): void {

    const promises = this.medicineCodes.map(medicine => this.cima.getByNRegistro(medicine));
    Promise.all(promises).then(responses => {
        this.medicines = responses.map(response => response[0]);
    });

  }


  promptApply(template: TemplateRef<any>) { //! Maybe call it create... as well
    this.promptModal = this.modalService.show(template);
  }

  apply() {
    //Perform the service request
    const medicines = this.medicines.map(medicine => medicine.nregistro);
    this.patientService.updatePatient({medicines})
      .then((response: any) => {
        console.log("hemos obtenido la respuesta", response);
        //!Comprobar si ha venido un error en al respuesta,
        //!para alertar con mensaje de fallo
        this.medicines = response.data.medicines;
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
