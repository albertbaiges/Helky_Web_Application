import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SaludComponent } from "./salud-component/salud.component";
import { TrackingComponent } from "../shared/components/tracking/tracking.component";


const routes = [
    {
        path: "",
        component: SaludComponent
    },
    {
        path: "register",
        component: TrackingComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaludRoutingModule { }