import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MedicinesCimaService } from 'src/app/services/medicines-cima.service';
import { MedicineBoxModalComponent } from '../../shared/components/medicine-box-modal/medicine-box-modal.component';

@Component({
  selector: 'app-search-medicines',
  templateUrl: './search-medicines.component.html',
  styleUrls: ['./search-medicines.component.css']
})
export class SearchMedicinesComponent implements OnInit {

  results: any[];
  searched: boolean;
  bsModalRef: BsModalRef;
  @Output() medicine: EventEmitter<any>;

  constructor(private cima: MedicinesCimaService,
              private modalService: BsModalService) { 
    this.searched = false;
    this.medicine = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  showDetails(medicine: any) {
      const modalOptions = {
        animated: true,
        class: 'modal-dialog-centered',
        backdrop: true,
        keyboard: true,
        initialState: {
          medicine
        }
      }
      this.bsModalRef = this.modalService.show(MedicineBoxModalComponent, modalOptions);
      this.bsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
        if (this.bsModalRef?.content.hideReason === "success") {
          //! what now?
        }
      });
  }

  emitMedicine(medicine: any) {
    this.medicine.emit(medicine);
  }

  searchMedicines(medicinesForm: NgForm){
    const {medicine} = medicinesForm.value;
    //Valirdar que no se haya metido un vacio, return si medicine "" y avisar


    if(isNaN(medicine)) {
      console.log("Han entrado el medicamento", medicine, typeof medicine);
      //Tenemos el nombre de medicamento en medicine
      this.cima.getByName(medicine).then(response => {
        this.results = response;
        this.searched = true;
      });
    } else {
      //Helpers
      const ncFirstNumber = [6,7,8,9]; //National codes start by those numbers
      const ncLenght = 6; //National codes lenght (without .X)

      const firstNumber = medicine.charAt(0);
      const code = Number(medicine);
      if(ncFirstNumber.includes(firstNumber) && medicine.length === ncLenght) {
        //Tenemos un codigo nacional en code
        this.cima.getByNationalCode(code).then(response => {
          this.results = response;
          this.searched = true;

        });
      } else {
        //Tenemos un codigo de registro en code
        this.cima.getByNRegistro(code).then(response => {
          this.results = response;
          this.searched = true;
        });
      }
    }
  }
}
