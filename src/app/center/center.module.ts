import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CenterRoutingModule } from './center-routing.module';
import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './patients/patients.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MedicsComponent } from './medics/medics.component';

@NgModule({
  declarations: [HomeComponent, PatientsComponent, MedicsComponent],
  imports: [
    CommonModule,
    CenterRoutingModule,
    AccordionModule.forRoot()
  ]
})
export class CenterModule { }
