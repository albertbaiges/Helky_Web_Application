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
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    HomeComponent,
    MealPlanComponent,
    MedicinesComponent,
    RegistersComponent,
    MedicsComponent,
    CentersComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    AccordionModule.forRoot(),
    FormsModule
  ]
})
export class PatientModule { }
