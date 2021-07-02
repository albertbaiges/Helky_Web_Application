import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PatientInfoService } from 'src/app/medic/services';
import { IDropdownSettings} from "ng-multiselect-dropdown"
import { PatientService } from 'src/app/services/patient.service';
import { MedicinesCimaService } from 'src/app/services/medicines-cima.service';
import { PlansService } from 'src/app/services/plans.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-medicines-plan',
  templateUrl: './edit-medicines-plan.component.html',
  styleUrls: ['./edit-medicines-plan.component.css']
})
export class EditMedicinesPlanComponent implements OnInit {
  planID: string;
  dayMedicines: any;
  patient: any;
  medicines: any;
  _medicines: any;
  dropdownSettings: IDropdownSettings;
  dropdownExportSettings: IDropdownSettings;
  previewImage: string;
  weekdays: any[];
  medicineSlot: any;

  selectedHour: Date;

  exportContent: boolean;
  exportedData: boolean;

  constructor(private bsModalRef: BsModalRef,
    private plansService: PlansService,
    private cima: MedicinesCimaService,
    private toastr: ToastrService) {
      this.medicines = null;
      this.previewImage = "";
      this.medicineSlot = {medicine: null, at: []};
      this.exportContent = false;
      this.exportedData = false;
    }

  ngOnInit(): void {
    console.log("son las medicinas de", this.patient)
    console.log("antes de buscar datos", this.dayMedicines.medicines);
    const promises = this.patient.medicines.map((code: any) => this.cima.getByNRegistro(code));
    
    Promise.all(promises).then(medicines => {
      this.medicines = medicines.map((medicine: any) => medicine[0]);
      this._medicines = Object.assign({}, this.medicines);
      console.log(this.medicines);
    });

    this.dropdownSettings = {
      singleSelection: true,
      idField: "nregistro",
      textField: "name",
      itemsShowLimit: 3,
      searchPlaceholderText: "Medicamento",
      noDataAvailablePlaceholderText: "Sin medicinas",
      closeDropDownOnSelection: true
    };
    this.weekdays = [
      {day: 'monday', spanish: "Lunes"},
      {day: 'tuesday', spanish: "Martes"},
      {day: 'wednesday', spanish: "Miércoles"},
      {day: 'thursday', spanish: "Jueves"},
      {day: 'friday', spanish: "Viernes"},
      {day: 'saturday', spanish: "Sábado"},
      {day: 'sunday', spanish: "Domingo"}
    ];
    this.weekdays = this.weekdays.filter(weekday => weekday.day !== this.dayMedicines.day);
    this.dropdownExportSettings = {
      idField: "day",
      textField: "spanish",
      searchPlaceholderText: "Día",
      noDataAvailablePlaceholderText: "Sin dias"
    };
  }


  closeModal() {
    this.bsModalRef.hide();
  }

  select(medicine: any) {
    console.log("Seleccionada", medicine)
    this.medicineSlot.medicine = medicine.nregistro;
    const [medicineInfo] = this.medicines.filter(({nregistro}: any) => medicine.nregistro === nregistro);
    this.previewImage = medicineInfo.box;
    console.log(this.medicineSlot)
  }

  deselect() {
    
  }

  remove(index: number) {
    this.dayMedicines.medicines.splice(index, 1);
  }

  addHour() {
    const hour = this.selectedHour.toTimeString().split(" ")[0];
    this.medicineSlot.at.push(hour);
  }

  removeHour(index: number) {
    this.medicineSlot.at.splice(index, 1);
  }

  submitExport(value: any) {
    if (value.days !== null && value.days.length !== 0) {
      const medicines = this.compactMedicines(this.dayMedicines.medicines)
      const updates = value.days.map((weekday: any) => ({
        day: weekday.day,
        medicines
      }));
      console.log(updates)
      const promises = updates.map((update: any) => this.plansService.updateMedicines(this.planID, update));
      Promise.all(promises).then(response => {
        this.exportedData = true;
        this.toastr.success("Pauta de medicamentos actualizada", "", {
          timeOut: 2000,
          positionClass: "toast-top-right"
        });
      })
    }
  }

  private compactMedicines(medicines: any) {
    const compactSlots: Array<any> = [];
    medicines.forEach((slot: any) => {
      const compactSlot = compactSlots.find(compactSlot => compactSlot.code === slot.code);
      if(compactSlot) {
        compactSlot.at.push(slot.at);
      } else {
        const medicineSlot = {
          at: [slot.at],
          code: slot.code
        }
        compactSlots.push(medicineSlot);
        console.log("se ha creado un nuevo compact slots", medicineSlot)
      }
    });
    return compactSlots;
  }

  private splitHours(slot: any): Array<any> {
    const slots: any = [];
    slot.at.forEach((hour: any) => {
      slots.push({
        at: hour,
        code: slot.medicine,
        data: slot.data
      })
    });

    return slots;
  }


  addToCalendar() {
    // this.dayMedicines.medicines.push(this.medicineSlot);
    this.cima.getByNRegistro(this.medicineSlot.medicine).then(medicineInfo => {
      const slot = this.medicineSlot;
      slot.data = medicineInfo[0];
      const slots = this.splitHours(slot)
      this.dayMedicines.medicines = this.dayMedicines.medicines.concat(slots);
      this.dayMedicines.medicines.sort((a: any, b:any) => {
        if(a.at < b.at) {
          return -1;
        } else {
          return 1;
        }
      });
      this.medicineSlot = {medicine: null, at: []};
      this.previewImage = "";
    });
  }


  submit() {
    console.log("Antes de compactar", this.dayMedicines.medicines)
    const medicines = this.compactMedicines(this.dayMedicines.medicines)
    const data = {
      day: this.dayMedicines.day,
      medicines
    }
    console.log("datos a actualizar", data);
    this.plansService.updateMedicines(this.planID, data)
      .then(response => {
        this.toastr.success("Pauta de medicamentos actualizada", "", {
          timeOut: 2000,
          positionClass: "toast-top-right"
        });
       })
  }

}
