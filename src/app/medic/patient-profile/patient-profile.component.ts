import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { PatientInfoService } from '../services';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit, AfterViewInit {

  @ViewChild("profile", {read: ViewContainerRef}) profile: ViewContainerRef;
  constructor(private patientInfoService: PatientInfoService, 
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProfileComponent);
    const componentReference = this.profile.createComponent(componentFactory);
    componentReference.instance.user = this.patientInfoService.patient;
    componentReference.instance.ngOnInit();
  }


}
