import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MedicsComponent } from './medics/medics.component';
import { PatientsComponent } from './patients/patients.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "patients",
    component: PatientsComponent
  },
  {
    path: "medics",
    component: MedicsComponent
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
export class CenterRoutingModule { }
