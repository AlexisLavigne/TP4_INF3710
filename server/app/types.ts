export default {
  Server: Symbol("Server"),
  Application: Symbol("Application"),
  DatabaseController: Symbol("DatabaseController"),
  DatabaseService: Symbol("DatabaseService"),
};

export type PlanRepas = {
  numeroplan: number;
  categorie: string;
  frequence: number;
  nbpersonnes: number;
  nbcalories: number;
  prix: number;
  numerofournisseur: number;
};