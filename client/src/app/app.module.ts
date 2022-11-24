import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from './modules/material.module';
import { JardinsComponent } from './jardins/jardins.component';
import { VarietesComponent } from './varietes/varietes.component';
import { PlantesComponent } from './plantes/plantes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from "./jardins/dialog.component";
import { AddVarieteComponent } from "./varietes/add-variete.component";
import { PendingQueryComponent } from "./varietes/pending-query.component";
import { ModifyVarieteComponent } from "./varietes/modify-variete.component";
import { DeleteVarieteComponent } from "./varietes/delete-variete.component";
import { PlanRepasComponent } from './plan-repas/plan-repas.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    JardinsComponent,
    DialogComponent,
    VarietesComponent,
    PlantesComponent,
    AddVarieteComponent,
    PendingQueryComponent,
    ModifyVarieteComponent,
    DeleteVarieteComponent,
    PlanRepasComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [CommunicationService],
  entryComponents: [DialogComponent, AddVarieteComponent, PendingQueryComponent, ModifyVarieteComponent, DeleteVarieteComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
