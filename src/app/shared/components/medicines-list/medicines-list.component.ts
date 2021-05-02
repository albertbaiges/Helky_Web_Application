import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MedicinesCimaService } from 'src/app/services/medicines-cima.service';
import { MedicineBoxModalComponent } from '../medicine-box-modal/medicine-box-modal.component';

@Component({
  selector: 'app-medicines-list',
  templateUrl: './medicines-list.component.html',
  styleUrls: ['./medicines-list.component.css']
})
export class MedicinesListComponent implements OnInit {

  @Input() registerCodes: Array<any>;
  medicines: Array<any>;
  private bsModalRef: BsModalRef;
  
  constructor(private cima: MedicinesCimaService,
    private modalService: BsModalService) {

  }

  ngOnInit(): void {
    console.log("codigos de registro", this.registerCodes)
    if(this.registerCodes.length !== 0) {
      // this.showSpinner("loading");
      const promises = this.registerCodes.map(medicine => this.cima.getByNRegistro(medicine));
      Promise.all(promises).then(responses => {
          this.medicines = responses.map(response => response[0]);
          console.log("Medicinas que debe tomarse", this.medicines);
          // this.hideSpinner("loading");
      });
    }
  }


  showDetails(medicine: any) {
    console.log(medicine)
    const modalOptions = {
      animated: true,
      class: 'modal-dialog-centered modal-lg',
      backdrop: true,
      keyboard: true,
      initialState: {
        medicine
      },
    }
    this.bsModalRef = this.modalService.show(MedicineBoxModalComponent, modalOptions);
    // this.bsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
    //   if (this.bsModalRef?.content.hideReason === "success") {
    //     //! what now?
    //   }
    // });
  }
}
