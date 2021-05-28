import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './public/privacy/privacy.component';
import { ReleaseNotesComponent } from './public/release-notes/release-notes.component';
import { CenterComponent } from './public/tutorials/center/center.component';
import { LandingComponent } from './public/tutorials/landing/landing.component';
import { MedicComponent } from './public/tutorials/medic/medic.component';
import { PatientComponent } from './public/tutorials/patient/patient.component';
import { LoginComponent } from './signing/login/login.component';
import { RegisterComponent } from './signing/register/register.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: 'full',
  },
  {
    path: "",
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    children: [
      {
        path: "home",
        loadChildren: () => import("./patient/patient.module").then(module => module.PatientModule)
      },
      {
        path: "medic",
        loadChildren: () => import("./medic/medic.module").then(module => module.MedicModule)
      },
      {
        path: "center",
        loadChildren: () => import("./center/center.module").then(module => module.CenterModule)
      }
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: RegisterComponent
  },
  {
    path: "release_notes",
    component: ReleaseNotesComponent
  },
  {
    path: "privacy",
    component: PrivacyComponent
  },
  {
    path: "tutorials",
    component: LandingComponent,
    children: [
      {
        path: "patient",
        component: PatientComponent,
        outlet: "tutorials"
      },
      {
        path: "medic",
        component: MedicComponent,
        outlet: "tutorials"
      },
      {
        path: "center",
        component: CenterComponent,
        outlet: "tutorials"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
