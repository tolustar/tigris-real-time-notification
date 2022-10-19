import express from "express";
import { DB, Tigris } from "@tigrisdata/core";
import { Inventory, inventorySchema } from "./models/inventory";
import { InventoryController } from "./controllers/inventory-controller";

export class App {
  private readonly app: express.Application;
  private readonly port: string | number;
  private readonly dbName: string;
  private readonly tigris: Tigris;
  private db: DB;

  constructor() {
    this.app = express();
    this.port = 8080;
    this.dbName = "my_commerce";

    this.tigris = new Tigris({
      serverUrl: "localhost:8081",
      insecureChannel: true,
    });

    this.setup();
  }

  public async setup() {
    this.app.use(express.json());
    this.app.use(express.static("public"));
    await this.initializeTigris();
    await this.setupControllers();
  }

  public async initializeTigris() {
    // create database (if not exists)
    this.db = await this.tigris.createDatabaseIfNotExists(this.dbName);
    console.log("db: " + this.dbName + " created successfully");

    // register collections schema and wait for it to finish
    await Promise.all([
      this.db.createOrUpdateTopic<Inventory>(
        "inventories",
        inventorySchema
      ),
    ]);
  }

  public setupControllers() {
    new InventoryController(this.db, this.app);
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${this.port}`
      );
    });
  }
}
