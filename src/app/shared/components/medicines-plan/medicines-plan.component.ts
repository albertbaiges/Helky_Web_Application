import { HttpResponseBase } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PlansService } from 'src/app/services/plans.service';
import { MedicinesCimaService } from 'src/app/services/medicines-cima.service';
import { MedicineBoxModalComponent } from '../medicine-box-modal/medicine-box-modal.component';
import { EditMedicinesPlanComponent } from './edit-medicines-plan/edit-medicines-plan.component';

@Component({
  selector: 'app-medicines-plan',
  templateUrl: './medicines-plan.component.html',
  styleUrls: ['./medicines-plan.component.css']
})
export class MedicinesPlanComponent implements OnInit {

  planID: string;
  patient: any;
  private weekdaysMap: any;
  weekDays: Array<string>;
  weekDaysEn: Array<string>;
  weekMedicines: any; //DayMealsModel[]
  detailsModalRef: BsModalRef;

  constructor(private bsModalRef: BsModalRef, private plansService: PlansService,
    private cima: MedicinesCimaService, private modalService: BsModalService) { 
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
    this.weekMedicines = [];
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    const weekMedicinesTemp: any = []
    this.plansService.getMedicines(this.planID)
      .then((weekMedicines: Array<any>) => {
        // console.log(weekMedicines)
        console.log(weekMedicines)
        for (const dayMedicines of weekMedicines) {
          const dayPos = this.weekdaysMap[dayMedicines.day];
          if(dayMedicines.medicines) {
            let medicines: any = [];
            dayMedicines.medicines
              .forEach((medicine: any, index: number) => {
                if(medicine.at.constructor === Array) {
                    console.log("Hay que separar el", medicine.at)
                    const slots: any = [];
                    medicine.at.forEach((hour: any) => {
                      slots.push({
                        at: hour,
                        code: medicine.code,
                      })
                    });
                    medicines = medicines.concat(slots);
                  } else {
                    medicines.push(medicine);
                  }
              });
            dayMedicines.medicines = medicines;
            
            dayMedicines.medicines.sort((a: any, b:any) => {
              if(a.at < b.at) {
                return -1;
              } else {
                return 1;
              }
            });

            weekMedicinesTemp[dayPos] = dayMedicines;
          }
        }

        console.log("Medicinas semanales", weekMedicinesTemp)


        //All medicines as array
        let medicineCodes: any = [];

        weekMedicinesTemp.forEach((dayMedicines: any) => {
          dayMedicines.medicines.forEach((medicine: any) => {
            medicineCodes.push(medicine.code);
          });
        });

        //Remove duplicates
        medicineCodes = Array.from(new Set(medicineCodes));
        console.log("codigos unicos", medicineCodes)


        //Request names
        const promises = medicineCodes.map((code: string) => this.cima.getByNRegistro(code));
        Promise.all(promises).then(response => {
          response.forEach((medicineData: any) => {
            weekMedicinesTemp.forEach((dayMedicines: any) => {
              const meds = dayMedicines.medicines.filter((medicine: any) => medicine.code == medicineData[0].nregistro);
              meds.forEach((med: any) => {
                med.data = medicineData[0];
              });
            });
          });
          this.weekMedicines = weekMedicinesTemp;
          // console.log("medicamentos semanales", this.weekMedicines)
        })
      });
  }


  closeModal() {
    this.bsModalRef.hide();
  }

  showDetails(medicine: any) {
    // console.log(medicine)
    const modalOptions = {
      animated: true,
      class: 'modal-dialog-centered modal-lg border-radius-modal',
      backdrop: true,
      keyboard: true,
      initialState: {
        medicine
      },
    }
    this.detailsModalRef = this.modalService.show(MedicineBoxModalComponent, modalOptions);
    // this.bsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
    // });
  }


  editDayMedicines(dayMedicines: any) {
    const modalOptions = {
      animated: true,
      class: 'modal-dialog-centered modal-lg border-radius-modal',
      backdrop: true,
      keyboard: true,
      initialState: {
        planID: this.planID,
        dayMedicines: Object.assign({}, dayMedicines),
        patient: this.patient
      },
    }
    this.detailsModalRef = this.modalService.show(EditMedicinesPlanComponent, modalOptions);
    this.detailsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
      console.log(this.detailsModalRef.content.dayMedicines)
      const dayInfo = this.detailsModalRef.content.dayMedicines;
      const dayPos = this.weekdaysMap[dayInfo.day];
      this.weekMedicines[dayPos] = dayInfo;
      const exported: boolean = this.detailsModalRef.content.exportedData;

      console.log("se han exportado datos a otros dias?", exported);
      if (exported) {
        this.init();
      }
    });
  }
}
