import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Fournisseur } from '../../../../common/tables/Fournisseur';
import { PlanRepas } from '../../../../common/tables/PlanRepas';
import { CommunicationService } from '../services/communication.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

export interface DialogData {
  numeroplan: number;
  categorie: string;
  frequence: number;
  nbpersonnes: number;
  nbcalories: number;
  prix: number;
  numerofournisseur: any;
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  public oldId = this.data.numeroplan;
  fournisseurs: string[];
  categories: string[];
  nbpersonnes: number[] = [1, 2, 3, 4, 5];
  frequences: number[] = [1, 2, 3, 4, 5, 6, 7];

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    public snackBar: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly communicationService : CommunicationService
  ) { }

  ngOnInit(): void {
    this.fournisseurs = [];
    this.categories = [];
    this.communicationService.getAllFournisseurs().subscribe((fournisseurs: Fournisseur[]) => {
      for (let fournisseur of fournisseurs){
        this.fournisseurs.push(fournisseur.numerofournisseur + " - " + fournisseur.nomfournisseur);
        if (this.data.numerofournisseur === fournisseur.numerofournisseur) this.data.numerofournisseur += " - " + fournisseur.nomfournisseur;
      }
    });
    this.communicationService.getAllPlansRepas().subscribe((plans: PlanRepas[]) => {
      for (let plan of plans) if (!(this.categories.includes(plan.categorie))) this.categories.push(plan.categorie);
    });
  }
  
  openSnackBar(message: string): void {
    this.snackBar.open(SnackBarComponent, {
      width: '400px',
      data: {
        message: message,
      }
    });
  }

  editPlan(): void {
    const editedPlan: PlanRepas = {
      numeroplan: this.data.numeroplan,
      categorie: this.data.categorie,
      frequence: this.data.frequence,
      nbpersonnes: this.data.nbpersonnes,
      nbcalories: this.data.nbcalories,
      prix: this.data.prix,
      numerofournisseur: Number(this.data.numerofournisseur.toString()[0])
    } 
    if (this.data.nbcalories <= 0 || this.data.prix <= 0) {
      this.openSnackBar("Vous devez entrer un nombre supérieur à 0. Veuillez réessayer.");
      return;
    }
    if ((this.data.nbcalories - Math.floor(this.data.nbcalories)) !== 0) {
      this.openSnackBar("Vous devez entrer un nombre entier. Veuillez réessayer.");
      return;
    }
    this.communicationService.getAllPlansRepas().subscribe((data: PlanRepas[]) => {
      this.communicationService.editPlanRepas(editedPlan, this.oldId).subscribe((res: any) => {
        console.log(res);
        this.openSnackBar(res.message ? res.message: 'Le plan a été modifié avec succès!');
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
