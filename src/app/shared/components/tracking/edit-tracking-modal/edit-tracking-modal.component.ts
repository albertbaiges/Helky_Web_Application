import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { RegistersService } from 'src/app/services/registers.service';

@Component({
  selector: 'app-edit-tracking-modal',
  templateUrl: './edit-tracking-modal.component.html',
  styleUrls: ['./edit-tracking-modal.component.css']
})
export class EditTrackingModalComponent implements OnInit {

  day: any;
  patient: any;
  registerID: string;
  month: any;
  stamp: string;

  editable: boolean

  atList: Array<string>;
  atMap: any;

  dropdownSettings: IDropdownSettings;

  constructor(private authService: AuthorizationService, private bsModalRef: BsModalRef,
    private registersService: RegistersService) {
  }

  ngOnInit(): void {
    this.editable = this.authService.user.userID === this.patient.userID;
    this.atList = ["Antes de una comida", "Despues de una comida", "Antes actividad fisica", "Despues actividad fisica", "Otro"];
    this.atMap = {
      "Antes de una comida": "prior meal",
      "Despues de una comida": "post meal" ,
      "Antes actividad fisica": "prior activity" ,
      "Despues actividad fisica": "post activity",
      "Otro": "other"
    }

    this.dropdownSettings = {
      singleSelection: true,
      searchPlaceholderText: "Momento",
      noDataAvailablePlaceholderText: "No disponible",
      closeDropDownOnSelection: true
    };
  }

  addRegister(value: any) {
    console.log("tenemos valores", value)
    if(!value.data || !value.hour) {
      console.warn("invalid");
      return
    }

    const date = new Date(this.stamp);
    
    const timestamp = new Date(date.getFullYear(), date.getMonth(), this.day.number,
                              value.hour.getHours(), value.hour.getMinutes(), value.hour.getSeconds());

    console.log("Marca de tiempo", timestamp);



    let at = value.at[0];
    if(!at) {
      at = "Otro";
    }
    const atAPIValue = this.atMap[at];

    const body = {
      data: value.data,
      timestamp: timestamp.toISOString(),
      at: atAPIValue
    }

    this.registersService.addRegister(this.registerID, body)
      .then(response => {
        console.log("response")
      });
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
