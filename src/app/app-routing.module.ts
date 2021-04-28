import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authorization/auth.guard';
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
    children: [
      {
        path: "home",
        component: HomeComponent
      },  
      // {
      //   path: "meals",
      //   loadChildren: () => import("./shared/components/meals/meals.module").then(module => module.MealsModule)
      // },
      {
        path: "salud",
        loadChildren: () => import("./salud/salud.module").then(module => module.SaludModule)
      },
      {
        path: "medic",
        loadChildren: () => import("./medic/medic.module").then(module => module.MedicModule)
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
