import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

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
export class EditDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
