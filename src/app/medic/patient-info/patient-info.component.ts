import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Patient } from 'src/app/models/Patient';
import { PatientInfoService } from '../services';
import { IDropdownSettings} from "ng-multiselect-dropdown"
import { TrackingComponent } from "../../shared/components/tracking/tracking.component";
import { MealsComponent } from 'src/app/shared/components/meals/meals-component/meals.component';
import { MedicinesCimaService } from 'src/app/services/medicines-cima.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditMedicinesComponent } from './edit-medicines/edit-medicines.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MedicineBoxModalComponent } from 'src/app/shared/components/medicine-box-modal/medicine-box-modal.component';
import { MedicinesPlanComponent } from 'src/app/shared/components/medicines-plan/medicines-plan.component';
import { ExercisesComponent } from 'src/app/shared/components/exercises/exercises.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {
  dropdownSettings: IDropdownSettings;
  patient: Patient;
  registeredDisorders: Array<any>;
  medicines: Array<any>
  registerRefs: Map<string, ComponentRef<TrackingComponent>>;
  dietRef: ComponentRef<MealsComponent> | null;
  activityRef: ComponentRef<ExercisesComponent> | null;
  editModalRef: BsModalRef;
  bsModalRef: any;
  patientRegisters: Array<any>;
  
  @ViewChild("dietCont", { read: ViewContainerRef }) dietCont: ViewContainerRef;
  @ViewChild("activityCont", { read: ViewContainerRef}) activityCont: ViewContainerRef;
  @ViewChild("registersCont", { read: ViewContainerRef }) registersCont: ViewContainerRef;

  constructor(private router: Router, 
              private patientInfoService: PatientInfoService, private componentFactoryResolver: ComponentFactoryResolver,
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
    this.patientRegisters = [];
  }

  ngOnInit(): void {
    this.patient = this.patientInfoService.patient;
    console.log(this.patient)
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
    console.log("Enfermedades del paciente", this.patient.disorders)
    this.registeredDisorders = Object.values(this.patient.disorders).filter((disorder: any) => disorder.registerID);
    console.log("enfermedades", this.patient.disorders);
    console.log("enfermedades registradas", this.registeredDisorders);
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

  showActivity() {
    if(this.activityRef) {
      this.activityRef.destroy();
      this.activityRef = null;
    } else {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ExercisesComponent);
      const componentReference = this.activityCont.createComponent(componentFactory);
      componentReference.instance.planID = this.patient.userID;
      this.activityRef = componentReference;
    }
  }

  select(value: any) {
    // console.log("selected", value)
    const { registerID } = value;
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TrackingComponent);
    // const componentReference = this.registersCont.createComponent(componentFactory);
    // componentReference.instance.registerID = registerID;
    // console.log("referencia", componentReference)
    // this.registerRefs.set(registerID, componentReference);


    this.patientRegisters.push(registerID);


  }

  selectAll(values: Array<any>) {
    values.forEach(value => {
      this.select(value);
    })
  }

  deselect(value: any) {
    const { registerID } = value;
    // const componentReference = this.registerRefs.get(registerID)!;
    // componentReference.destroy();
    // this.registerRefs.delete(registerID);
    const index = this.patientRegisters.indexOf(registerID);
    this.patientRegisters.splice(index, 1);

  }

  deselectAll() {
    this.patientRegisters = [];
  }


  editMedicines() {
    const modalOptions = {
      animated: true,
      class: 'modal-dialog-centered edit-medicines-modal border-radius-modal',
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

  medicinesCalendar() {
    const modalOptions = {
      animated: true,
      class: 'modal-dialog-centered edit-medicines-modal border-radius-modal',
      backdrop: true,
      keyboard: true,
      initialState: {
        planID: this.patient.userID,
        patient: this.patient
      },
    }
    this.bsModalRef = this.modalService.show(MedicinesPlanComponent, modalOptions);
    this.bsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
      if (this.bsModalRef?.content.hideReason === "success") {
        //! what now?
      }
    });
  }

  showDetails(medicine: any) {
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
    this.bsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
      if (this.bsModalRef?.content.hideReason === "success") {
        //! what now?
      }
    });
  }

  goBack() {
    this.router.navigateByUrl("/medic/patients");
  }


}
