import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { HomeComponent } from './home/home.component';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { SharedModule } from '../shared/shared.module';
import { MedicinesComponent } from './medicines/medicines.component';
import { RegistersComponent } from './registers/registers.component';
import { MedicsComponent } from './medics/medics.component';
import { CentersComponent } from './centers/centers.component';


@NgModule({
  declarations: [
    HomeComponent,
    MealPlanComponent,
    MedicinesComponent,
    RegistersComponent,
    MedicsComponent,
    CentersComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule
  ]
})
export class PatientModule { }
