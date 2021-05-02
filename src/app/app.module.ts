import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from "ngx-bootstrap/modal"
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './signing/login/login.component';
import { NoAccountInterceptor } from './interceptors/noaccount.interceptor';
import { FormsModule } from "@angular/forms"
import { HomeComponent } from './home/home.component';
import { ApiUrlInterceptor } from './interceptors/ApiUrlInterceptor';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MealsComponent } from './shared/components/meals/meals-component/meals.component';
import { MealModalComponent } from './shared/components/meals/meal-modal/meal-modal.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent
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
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
