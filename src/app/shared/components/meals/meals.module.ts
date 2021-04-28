import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsComponent } from './meals-component/meals.component';
import { MealsRoutingModule } from "./meals-route.module";



@NgModule({
  declarations: [MealsComponent],
  imports: [
    CommonModule,
    MealsRoutingModule
  ]
})
export class MealsModule { }
