import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaludRoutingModule } from './salud-route.module';
import { SaludComponent } from './salud-component/salud.component';
import { TrackingComponent } from '../shared/components/tracking/tracking.component';
import { CreateRegisterModalComponent } from './salud-component/create-register-modal/create-register-modal.component';



@NgModule({
  declarations: [SaludComponent, TrackingComponent, CreateRegisterModalComponent],
  imports: [
    CommonModule,
    SaludRoutingModule
  ]
})
export class SaludModule { }
