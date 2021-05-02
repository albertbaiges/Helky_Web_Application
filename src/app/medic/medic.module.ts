import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap/modal"
import { MedicRoutingModule } from './medic-routing.module';
import { MedicAdminComponent } from './medic-admin/medic-admin.component';
import { AdminPatientsComponent } from './admin-patients/admin-patients.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { TrackingComponent } from './tracking/tracking.component';
import { SearchMedicinesComponent } from './search-medicines/search-medicines.component'
import { FormsModule } from "@angular/forms";
import { MedicineBoxModalComponent } from '../shared/components/medicine-box-modal/medicine-box-modal.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgxSpinnerModule } from "ngx-spinner";
import { EditMedicinesComponent } from './patient-info/edit-medicines/edit-medicines.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    MedicAdminComponent,
    AdminPatientsComponent,
    PatientInfoComponent,
    PatientRegisterComponent,
    TrackingComponent,
    SearchMedicinesComponent,
    EditMedicinesComponent,
    PatientProfileComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MedicRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    NgxImageZoomModule,
    NgxSpinnerModule
  ]
})
export class MedicModule { }
