import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './signing/login/login.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
