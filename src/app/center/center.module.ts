import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CenterRoutingModule } from './center-routing.module';
import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './patients/patients.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MedicsComponent } from './medics/medics.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, PatientsComponent, MedicsComponent, ProfileComponent],
  imports: [
    CommonModule,
    CenterRoutingModule,
    FormsModule,
    AccordionModule.forRoot()
  ]
})
export class CenterModule { }
