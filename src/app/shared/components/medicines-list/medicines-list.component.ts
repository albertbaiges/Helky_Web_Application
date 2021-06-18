import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MedicinesCimaService } from 'src/app/services/medicines-cima.service';
import { MedicineBoxModalComponent } from '../medicine-box-modal/medicine-box-modal.component';

@Component({
  selector: 'app-medicines-list',
  templateUrl: './medicines-list.component.html',
  styleUrls: ['./medicines-list.component.css']
})
export class MedicinesListComponent implements OnInit, OnChanges {

  @Input() registerCodes: Array<any>;
  medicines: Array<any>;
  private bsModalRef: BsModalRef;
  spinner: boolean;

  constructor(private cima: MedicinesCimaService,
    private modalService: BsModalService) {

  }

  
  ngOnInit(): void {
    this.init();
  }
  
  private init() {
    if(this.registerCodes.length !== 0) {
      this.showSpinner(true);
      const promises = this.registerCodes.map(medicine => this.cima.getByNRegistro(medicine));
      Promise.all(promises).then(responses => {
        this.medicines = responses.map(response => response[0]);
        console.log("Medicinas que debe tomarse", this.medicines);
        this.showSpinner(false);
      });
    } else {
      this.medicines = [];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.init()
  }


  private showSpinner(bool: boolean) {
    console.log("cambiando valor del spinner", bool)
    this.spinner = bool;
  }
  
  showDetails(medicine: any) {
    console.log(medicine)
    const modalOptions = {
      animated: true,
      class: 'modal-dialog-centered modal-lg border-radius-modal',
      backdrop: true,
      keyboard: true,
      initialState: {
        medicine
      },
    }
    this.bsModalRef = this.modalService.show(MedicineBoxModalComponent, modalOptions);
  }
}
