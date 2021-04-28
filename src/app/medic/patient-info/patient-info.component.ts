import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Patient } from 'src/app/models/Patient';
import { PatientInfoService } from '../services';
import { IDropdownSettings} from "ng-multiselect-dropdown"
import { PatientRegisterComponent } from '../patient-register/patient-register.component';
import { TrackingComponent } from "../tracking/tracking.component";
import { MealsComponent } from 'src/app/shared/components/meals/meals-component/meals.component';
import { MedicinesCimaService } from 'src/app/services/medicines-cima.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditMedicinesComponent } from './edit-medicines/edit-medicines.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MedicineBoxModalComponent } from 'src/app/shared/components/medicine-box-modal/medicine-box-modal.component';


@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {
  dropdownSettings: IDropdownSettings;
  patient: Patient;
  disorders: Array<any>;
  medicines: Array<any>
  registerRefs: Map<string, ComponentRef<TrackingComponent>>;
  dietRef: ComponentRef<MealsComponent> | null;
  editModalRef: BsModalRef;
  bsModalRef: any;
  
  @ViewChild("dietCont", { read: ViewContainerRef }) dietCont: ViewContainerRef;
  @ViewChild("registersCont", { read: ViewContainerRef }) registersCont: ViewContainerRef;

  constructor(private patientInfoService: PatientInfoService, private componentFactoryResolver: ComponentFactoryResolver,
              private spinner: NgxSpinnerService,
              private cima: MedicinesCimaService,
              private modalService: BsModalService) {

    this.dropdownSettings = {
      idField: "registerID",
      textField: "type",
      searchPlaceholderText: "Enfermedades",
      noDataAvailablePlaceholderText: "Sin enfermedades",
      allowSearchFilter: true
    };
    this.registerRefs = new Map();
    this.dietRef = null;
    this.medicines = [];
  }

  ngOnInit(): void {
    this.patient = this.patientInfoService.patient;
    console.log(this.patient.medicines)
    if(this.patient.medicines.length !== 0) {
      this.showSpinner("loading");
      const promises = this.patient.medicines.map(medicine => this.cima.getByNRegistro(medicine));
      Promise.all(promises).then(responses => {
          this.medicines = responses.map(response => response[0]);
          console.log("Medicinas que debe tomarse", this.medicines);
          this.hideSpinner("loading");
      });
    }
    this.disorders = Object.values(this.patient.disorders);
  }

  getAvatarLetters() {
    return this.patient.username.split(" ").map(word => word[0]).join("").toUpperCase();
  }

  showSpinner(spinner: any) {
    console.log("mostrando spinner")
    this.spinner.show(spinner);
  }


  hideSpinner(spinner: string) {
    console.log("oscultando spinner")

    this.spinner.hide(spinner);
  }

  showDiet() {
    if(this.dietRef) {
      this.dietRef.destroy();
      this.dietRef = null;
    } else {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MealsComponent);
      const componentReference = this.dietCont.createComponent(componentFactory);
      componentReference.instance.patientID = this.patient.userID;
      this.dietRef = componentReference;
    }
  }

  select(value: any) {
    console.log("selected", value)
    const { registerID } = value;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TrackingComponent);
    const componentReference = this.registersCont.createComponent(componentFactory);
    componentReference.instance.registerID = "1";
    console.log("referencia", componentReference)
    this.registerRefs.set(registerID, componentReference);
  }

  deselect(value: any) {
    const { registerID } = value;
    const componentReference = this.registerRefs.get(registerID)!;
    componentReference.destroy();
    this.registerRefs.delete(registerID);
  }

  editMedicines() {
    const modalOptions = {
      animated: true,
      class: 'modal-dialog-centered',
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        patientID: this.patient.userID,
        medicines: Array.from(this.medicines)
      }
    }
    this.editModalRef = this.modalService.show(EditMedicinesComponent, modalOptions);
    this.editModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
      if (this.editModalRef?.content.hideReason === "success") {
        console.log("al cerrarse tenemos accedo a los datos", this.editModalRef.content)
        this.patient.medicines = this.editModalRef.content.medicines;
        this.showSpinner("loading");
        const promises = this.patient.medicines.map(medicine => this.cima.getByNRegistro(medicine));
        Promise.all(promises).then(responses => {
            this.medicines = responses.map(response => response[0]);
            console.log("Medicinas que debe tomarse", this.medicines);
            this.hideSpinner("loading");
            console.log("HEEEY, el servicio conoce esto del paciente!", this.patientInfoService.patient);
        });
      }
    });
  }

  showDetails(medicine: any) {
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
    this.bsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
      if (this.bsModalRef?.content.hideReason === "success") {
        //! what now?
      }
    });
}
}
