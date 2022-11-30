import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get("/planrepas/:id?", (req: Request, res: Response, _: NextFunction) => {
      if (req.params.id) this.databaseService.getPlanRepas(Number(req.params.id)).then((result: pg.QueryResult) => res.json(result.rows));
      else this.databaseService.getAllPlanRepas().then((result: pg.QueryResult) => res.json(result.rows));
    });

    router.delete("/planrepas/:id", (req: Request, res: Response, _: NextFunction) => {
      if (req.params.id) this.databaseService.deletePlanRepas(Number(req.params.id))
        .then(() => res.json({message: 'Le plan à bien été supprimé!'}))
        .catch((e: Error) => {
          console.log(e.message);
          res.json({message: e.message});
        });
    });
    
    router.post("/planrepas/", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService.addPlanRepas(req.body)
        .then(() => res.json({message: 'Le plan à bien été rajouté!'}))
        .catch((e: Error) => {
          console.log(e.message);
          res.json({message: e.message});
        });
    });

    router.put("/planrepas/:id", (req: Request, res: Response, _: NextFunction) => {
        this.databaseService.editPlanRepas(req.body, Number(req.params.id))
          .then((result: pg.QueryResult) => res.json(result.rowCount))
          .catch((e: Error) => {
            console.error(e.message);
            res.json({message: e.message});
          });
      }
    );

    router.get("/fournisseurs", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService.getAllFournisseurs().then((result: pg.QueryResult) => res.json(result.rows))
      .catch((e: Error) => {
        console.error(e.message);
        res.json({message: e.message});
      });;
    });

    return router;
  }
}
