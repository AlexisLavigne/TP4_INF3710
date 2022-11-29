import { Component, OnInit } from '@angular/core';
import { PlanRepas } from '../../../../common/tables/PlanRepas';
import { CommunicationService } from '../services/communication.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-plan-repas',
  templateUrl: './plan-repas.component.html',
  styleUrls: ['./plan-repas.component.css']
})
export class PlanRepasComponent implements OnInit {
  name: string = 'Lolo';
  animal: string;
  plansRepas: PlanRepas[];
  displayedColumns: string[] = ['numeroplan', 'categorie', 'frequence', 'nbpersonnes', 'nbcalories', 'prix', 'numerofournisseur', 'delete', 'modify'];

  constructor(
    private readonly communicationService: CommunicationService,
    public addDialog: MatDialog,
    public editDialog: MatDialog,
    public deleteDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllPlansRepas();
  }
  private getAllPlansRepas(): void {
    this.communicationService.getAllPlansRepas().subscribe((plansrepas: any) => {
      this.plansRepas = plansrepas ? plansrepas: [];
    });
  };

  openAddDialog(): void {
    const dialogRef = this.addDialog.open(AddDialogComponent, {
      width: '650px',
      data: {
        numeroplan: 1, 
        categorie: "miam", 
        frequence: 1, 
        nbpersonnes: 4, 
        nbcalories: 500,
        prix: 49.99,
        numerofournisseur: "2 - Miam et Cie",
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  openEditDialog(id: number): void {
    this.communicationService.getPlanRepas(id).subscribe((planrepas: any) => {
      const dialogRef = this.addDialog.open(EditDialogComponent, {
        width: '650px',
        data: planrepas[0]
      });
      dialogRef.afterClosed().subscribe(result => {
        this.animal = result;
      });
    });
  }
  openDeleteDialog(id: number): void {
    this.communicationService.getPlanRepas(id).subscribe((planrepas: any) => {
      const dialogRef = this.addDialog.open(DeleteDialogComponent, {
        width: '650px',
        data: planrepas[0]
      });
      dialogRef.afterClosed().subscribe(result => {
        this.animal = result;
      });
    });
  }
}
