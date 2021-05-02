import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { MedicsComponent } from './medics/medics.component';
import { RegistersComponent } from './registers/registers.component';

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
    path: "registers",
    component: RegistersComponent
  },
  {
    path: "medics",
    component: MedicsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
