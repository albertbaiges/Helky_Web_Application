import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPatientsComponent } from './admin-patients/admin-patients.component';
import { HomeComponent } from './home/home.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientGuard } from './patient.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
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
  },
  {
    path: "profile",
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicRoutingModule { }
