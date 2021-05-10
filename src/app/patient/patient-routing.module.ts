import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityPlanComponent } from './activity-plan/activity-plan.component';
import { CentersComponent } from './centers/centers.component';
import { HomeComponent } from './home/home.component';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { MedicsComponent } from './medics/medics.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterTrackingComponent } from './register-tracking/register-tracking.component';
import { RegistersComponent } from './registers/registers.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "mealplan",
    component: MealPlanComponent
  },
  {
    path: "medicines",
    component: MedicinesComponent
  },
  {
    path: "activityplan",
    component: ActivityPlanComponent
  },
  {
    path: "registers",
    children: [
      {
        path: "",
        component: RegistersComponent
      },
      {
        path: "tracking",
        component: RegisterTrackingComponent
      }
    ]
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "medics",
    component: MedicsComponent
  },
  {
    path: "centers",
    component: CentersComponent
  },
  {
    path: "search",
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
