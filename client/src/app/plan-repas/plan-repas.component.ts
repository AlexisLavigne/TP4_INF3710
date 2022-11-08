import { Component, OnInit } from '@angular/core';
import { PlanRepas } from '../../../../common/tables/PlanRepas';
import { CommunicationService } from '../services/communication.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
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
  displayedColumns: string[] = ['numeroplan', 'categorie', 'frequence', 'nbpersonnes', 'nbcalories', 'prix', 'numerofournisseur', 'delete', 'modify', 'add'];

  constructor(
    private readonly communicationService: CommunicationService,
    public addDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllPlansRepas();
  }
  private getAllPlansRepas(): void {
    console.log('test');
    this.communicationService.getAllPlansRepas().subscribe((plansrepas: any) => {
      console.log(plansrepas);
      this.plansRepas = plansrepas ? plansrepas: [];
    });
  };

  openAddDialog(): void {
    const dialogRef = this.addDialog.open(AddDialogComponent, {
      width: '650px',
      data: {
        numeroplan: 1, 
        categorie: "test", 
        frequence: 1, 
        nbpersonnes: 4, 
        nbcalories: 500,
        prix: 49.99,
        numerofournisseur: 3,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
}
