import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { JardinsComponent } from '../jardins/jardins.component';
import { PlantesComponent } from '../plantes/plantes.component';
import { VarietesComponent } from '../varietes/varietes.component';
import { PlanRepasComponent } from "../plan-repas/plan-repas.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "jardins", component: JardinsComponent },
  { path: "plantes", component: PlantesComponent },
  { path: "varietes", component: VarietesComponent },
  { path: "planrepas", component: PlanRepasComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
