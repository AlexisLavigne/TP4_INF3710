import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
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
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  
  numeroplan: number;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private readonly communicationService : CommunicationService
  ) { this.numeroplan = data.numeroplan }

  deletePlan(): void {
    this.communicationService.deletePlanRepas(this.numeroplan).subscribe((res: number) => {});
    window.location.reload();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
