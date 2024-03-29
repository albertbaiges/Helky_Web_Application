import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap/modal"
import { MedicRoutingModule } from './medic-routing.module';
import { MedicAdminComponent } from './medic-admin/medic-admin.component';
import { AdminPatientsComponent } from './admin-patients/admin-patients.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { SearchMedicinesComponent } from './search-medicines/search-medicines.component'
import { FormsModule } from "@angular/forms";
import { MedicineBoxModalComponent } from '../shared/components/medicine-box-modal/medicine-box-modal.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgxSpinnerModule } from "ngx-spinner";
import { EditMedicinesComponent } from './patient-info/edit-medicines/edit-medicines.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CentersComponent } from './centers/centers.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MedicAdminComponent,
    AdminPatientsComponent,
    PatientInfoComponent,
    PatientRegisterComponent,
    SearchMedicinesComponent,
    EditMedicinesComponent,
    PatientProfileComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    NotificationsComponent,
    CentersComponent
  ],
  imports: [
    CommonModule,
    MedicRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    SharedModule,
    ModalModule.forRoot(),
    NgxImageZoomModule,
    NgxSpinnerModule,
    AccordionModule.forRoot(),
  ]
})
export class MedicModule { }
