import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Fournisseur } from '../../../../common/tables/Fournisseur';
import { PlanRepas } from '../../../../common/tables/PlanRepas';
import { CommunicationService } from '../services/communication.service';

export interface DialogData {
  numeroplan: number;
  categorie: string;
  frequence: number;
  nbpersonnes: number;
  nbcalories: number;
  prix: number;
  numerofournisseur: number;
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  public oldId = this.data.numeroplan;
  fournisseurs: number[];

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly communicationService : CommunicationService
  ) { }

  ngOnInit(): void {
    this.fournisseurs = [];
    this.communicationService.getAllFournisseurs().subscribe((fournisseurs: Fournisseur[]) => {
      for (let fournisseur of fournisseurs)
        this.fournisseurs.push(fournisseur.numerofournisseur);
    });
  }

  editPlan(): void {
    const newPlan : PlanRepas = {
      numeroplan: this.data.numeroplan,
      categorie: this.data.categorie,
      frequence: this.data.frequence,
      nbpersonnes: this.data.nbpersonnes,
      nbcalories: this.data.nbcalories,
      prix: this.data.prix,
      numerofournisseur: this.data.numerofournisseur} 
    // a optimiser
    if (!this.data.numeroplan || !this.data.categorie || !this.data.frequence || !this.data.nbpersonnes || !this.data.nbcalories || !this.data.prix || !this.data.numerofournisseur || this.data.numeroplan < 0 || this.data.frequence < 0 || this.data.nbpersonnes < 0 || this.data.nbcalories < 0 || this.data.prix < 0 || this.data.numerofournisseur < 0) return;
    this.communicationService.getAllPlansRepas().subscribe((data: PlanRepas[]) => {
      if (newPlan.numeroplan != this.oldId) for (let plan of data) if (plan.numeroplan == newPlan.numeroplan) return;
      this.communicationService.editPlanRepas(newPlan, this.oldId).subscribe((res: number) => {});
      window.location.reload();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
