import { Component, OnInit } from '@angular/core';
import { PlanRepas } from '../../../../common/tables/PlanRepas';
import { CommunicationService } from '../services/communication.service';


@Component({
  selector: 'app-plan-repas',
  templateUrl: './plan-repas.component.html',
  styleUrls: ['./plan-repas.component.css']
})
export class PlanRepasComponent implements OnInit {
  plansRepas: PlanRepas[];
  displayedColumns: string[] = ['numeroplan', 'categorie', 'frequence', 'nbpersonnes', 'nbcalories', 'prix', 'numerofournisseur'];

  constructor(private readonly communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.getAllPlansRepas();
  }
  private getAllPlansRepas(): void {
    console.log('test');
    this.communicationService.getAllPlansRepas().subscribe((plansrepas: any) => {
      console.log(plansrepas);
      this.plansRepas = plansrepas ? plansrepas: [];
    });
  }
}
