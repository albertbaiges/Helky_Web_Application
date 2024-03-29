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
import { ActivityPlanComponent } from './activity-plan/activity-plan.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RegisterTrackingComponent } from './register-tracking/register-tracking.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EditMedicinesComponent } from './edit-medicines/edit-medicines.component';
import { SearchMedicinesComponent } from './search-medicines/search-medicines.component';
import { CreateRegisterComponent } from './registers/create-register/create-register.component';

@NgModule({
  declarations: [
    HomeComponent,
    MealPlanComponent,
    MedicinesComponent,
    RegistersComponent,
    MedicsComponent,
    CentersComponent,
    ProfileComponent,
    SearchComponent,
    ActivityPlanComponent,
    RegisterTrackingComponent,
    NotificationsComponent,
    EditMedicinesComponent,
    SearchMedicinesComponent,
    CreateRegisterComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule,
    AccordionModule.forRoot(),
    FormsModule
  ]
})
export class PatientModule { }
