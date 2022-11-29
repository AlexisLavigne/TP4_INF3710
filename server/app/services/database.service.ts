import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { PlanRepas } from "../../../common/tables/PlanRepas";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "tp4",
    password: "root",
    port: 5432,        // Warning: can also be 5433 for some users
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  async getAllPlanRepas(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = 'SELECT * FROM "Planrepas" ORDER BY numeroplan asc;';
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getPlanRepas(id: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!id) throw new Error("Impossible de récupérer le plan désiré.");
    const queryText: string = `SELECT * FROM "Planrepas" where numeroplan = ${id};`
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async addPlanRepas(planrepas: PlanRepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!planrepas) throw new Error("Impossible d'ajouter le plan désiré.");
    const values: string[] = [
      planrepas.categorie,
      planrepas.frequence.toString(),
      planrepas.nbpersonnes.toString(),
      planrepas.nbcalories.toString(),
      planrepas.prix.toString(),
      planrepas.numerofournisseur.toString()
    ];
    const queryText: string = `INSERT INTO "Planrepas" VALUES(DEFAULT,$1,$2,$3,$4,$5,$6);`;
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  async deletePlanRepas(id: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!id) throw new Error("Impossible de supprimer le plan repas désiré.");
    const queryText: string = `DELETE FROM "Planrepas" where numeroplan = ${id};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async editPlanRepas(plan: PlanRepas, id: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!plan || !id) throw new Error("Impossible de modifier le plan désiré.");
    const editedPlan: (string | number)[] = [
      plan.numeroplan,
      plan.categorie,
      plan.frequence, 
      plan.nbpersonnes,
      plan.nbcalories, 
      plan.prix,
      plan.numerofournisseur
    ];
    const queryText: string = `UPDATE "Planrepas" SET numeroplan = $1, categorie = $2, frequence = $3, nbpersonnes = $4, nbcalories = $5, prix = $6, numerofournisseur = $7 WHERE numeroplan = ${id};`;
    const res = await client.query(queryText, editedPlan);
    client.release();
    return res;
  }

  async getAllFournisseurs(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = 'SELECT * FROM "Fournisseur";';
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getFournisseur(id: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT nomfournisseur FROM "Fournisseur" WHERE numerofournisseur = ${id};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }
}
