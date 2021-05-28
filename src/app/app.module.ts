import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from "ngx-bootstrap/modal"
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './signing/login/login.component';
import { FormsModule } from "@angular/forms"
import { HomeComponent } from './home/home.component';
import { ApiUrlInterceptor } from './interceptors/ApiUrlInterceptor';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { RegisterComponent } from './signing/register/register.component';
import { ReleaseNotesComponent } from './public/release-notes/release-notes.component';
import { ToastrModule } from 'ngx-toastr';
import { PatientComponent } from './public/tutorials/patient/patient.component';
import { LandingComponent } from './public/tutorials/landing/landing.component';
import { MedicComponent } from './public/tutorials/medic/medic.component';
import { CenterComponent } from './public/tutorials/center/center.component';
import { PrivacyComponent } from './public/privacy/privacy.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    RegisterComponent,
    ReleaseNotesComponent,
    PatientComponent,
    LandingComponent,
    MedicComponent,
    CenterComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
