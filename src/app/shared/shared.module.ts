import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsComponent } from './components/meals/meals-component/meals.component';
import { MealModalComponent } from './components/meals/meal-modal/meal-modal.component';
import { MedicineBoxModalComponent } from './components/medicine-box-modal/medicine-box-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { MedicinesListComponent } from './components/medicines-list/medicines-list.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { NgxImageZoomModule } from 'ngx-image-zoom';



@NgModule({
  declarations: [
    MealsComponent, 
    MealModalComponent,
    MedicineBoxModalComponent,
    ProfileComponent,
    TrackingComponent,
    MedicinesListComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    NgxImageZoomModule
  ],
  exports: [
    MealsComponent,
    MedicinesListComponent,
  ]
})
export class SharedModule { }
