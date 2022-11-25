import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { PlanRepas } from '../../../../common/tables/PlanRepas';
import { Fournisseur } from '../../../../common/tables/Fournisseur';
import { CommunicationService } from '../services/communication.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

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
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  fournisseurs: string[];
  nbpersonnes: number[] = [1, 2, 3, 4, 5];
  frequences: number[] = [1, 2, 3, 4, 5, 6, 7];
  message: string = "En attente de la reponse du serveur";

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    public snackBar: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly communicationService : CommunicationService,
  ) {}

  ngOnInit(): void {
    this.fournisseurs = [];
    this.communicationService.getAllFournisseurs().subscribe((fournisseurs: Fournisseur[]) => {
      for (let fournisseur of fournisseurs)
        this.fournisseurs.push(fournisseur.numerofournisseur + " - " + fournisseur.nomfournisseur);
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
  addPlan(): void {
    const newPlan : PlanRepas = {
      numeroplan: this.data.numeroplan,
      categorie: this.data.categorie,
      frequence: this.data.frequence,
      nbpersonnes: this.data.nbpersonnes,
      nbcalories: this.data.nbcalories,
      prix: this.data.prix,
      numerofournisseur: Number(this.data.numerofournisseur.toString()[0])
    } 
    if (this.data.nbcalories < 0 || this.data.prix < 0) {
      this.openSnackBar("Vous ne pouvez pas rentrer de valeur négative. Veuillez réessayer.");
      return;
    }
    this.communicationService.getAllPlansRepas().subscribe((data: PlanRepas[]) => {
      this.communicationService.addPlanRepas(newPlan).subscribe((res: any) => {
        console.log(res);
        this.message = res.message;
        this.openSnackBar(res.message);
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
