import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MealsComponent } from "./meals-component/meals.component"
const routes = [
    {
        path: "",
        component: MealsComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MealsRoutingModule { }