import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

interface DialogData {
  message: string
}

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent { 
  constructor(
    public dialogRef: MatDialogRef<SnackBarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
    
  public closeDialog() {
    this.dialogRef.close();
    window.location.reload();
  }
}
