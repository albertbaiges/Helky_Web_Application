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
import { MedicinesPlanComponent } from './components/medicines-plan/medicines-plan.component';
import { EditMedicinesPlanComponent } from './components/medicines-plan/edit-medicines-plan/edit-medicines-plan.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { ExercisesModalComponent } from './components/exercises/exercises-modal/exercises-modal.component';


@NgModule({
  declarations: [
    MealsComponent, 
    MealModalComponent,
    MedicineBoxModalComponent,
    ProfileComponent,
    TrackingComponent,
    MedicinesListComponent,
    MedicinesPlanComponent,
    EditMedicinesPlanComponent,
    ExercisesComponent,
    ExercisesModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgxImageZoomModule,
    TimepickerModule.forRoot()
  ],
  exports: [
    MealsComponent,
    MedicinesListComponent,
    MedicinesPlanComponent,
    ExercisesComponent,
    TrackingComponent
  ]
})
export class SharedModule { }
