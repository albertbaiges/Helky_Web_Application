import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPatientsComponent } from './admin-patients/admin-patients.component';
import { MedicAdminComponent } from "./medic-admin/medic-admin.component";
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientGuard } from './patient.guard';

const routes: Routes = [
  {
    path: "",
    component: MedicAdminComponent
  },
  {
    path: "patients",
    component: AdminPatientsComponent
  },
  {
    path: "patient",
    canActivate: [PatientGuard],
    children: [
      {
        path: "",
        component: PatientProfileComponent
      },
      {
        path: "administrate",
        component: PatientInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicRoutingModule { }
