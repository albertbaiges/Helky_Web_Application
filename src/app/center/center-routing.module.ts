import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MedicsComponent } from './medics/medics.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PatientsComponent } from './patients/patients.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterMedicComponent } from './register-medic/register-medic.component';
import { SearchComponent } from './search/search.component';

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
  },
  {
    path: "notifications",
    component: NotificationsComponent
  },
  {
    path: "search",
    component: SearchComponent
  },
  {
    path: "registermedic",
    component: RegisterMedicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CenterRoutingModule { }
