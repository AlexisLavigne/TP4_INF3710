import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommunicationService } from '../services/communication.service';

export interface DialogData {
  numeroplan?: number;
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
export class AddDialogComponent {
    
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly communicationService : CommunicationService
  ) {}

  addPlan(): void {
    const newPlan : DialogData = {numeroplan: this.data.numeroplan,
    categorie: this.data.categorie,
    frequence: this.data.frequence,
    nbpersonnes: this.data.nbpersonnes,
    nbcalories: this.data.nbcalories,
    prix: this.data.prix,
    numerofournisseur: this.data.numerofournisseur}

    console.log(newPlan);
    this.communicationService.addPlanRepas(newPlan).subscribe((res: number) => {});
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
