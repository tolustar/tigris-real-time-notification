import express, { NextFunction, Request, Response, Router } from "express";
import { Topic, DB } from "@tigrisdata/core";
import { Inventory } from "../models/inventory";


export interface Controller {
  setupRoutes(app: express.Application);
}

export class InventoryController implements Controller {
  private readonly inventories: Topic<Inventory>;
  private readonly router: Router;
  private readonly path: string;

  constructor(db: DB, app: express.Application) {
    this.inventories = db.getTopic<Inventory>("inventories");
    this.path = "/inventory";
    this.router = Router();
    this.setupRoutes(app);
  }

  public publish = async (req: Request, res: Response, next: NextFunction) => {
    const message: Inventory = req.body;
    this.inventories
      .publish(message)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        next(error);
      });
  };

  public subscribe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.inventories.subscribe({
      onNext(message: Inventory) {
        res.write(JSON.stringify(message));
      },
      onEnd() {
        res.end();
      },
      onError(error: Error) {
        next(error);
      },
    });
  };

  setupRoutes(app: express.Application) {
    this.router.post(`${this.path}/publish`, this.publish);
    this.router.post(`${this.path}/subscribe`, this.subscribe);
    app.use("/", this.router);
  }
}