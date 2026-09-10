import { D1Client } from "@effect/sql-d1";

// Wire this into the server after a real D1 binding and migrations are added.
export const makeDatabaseLayer = (db: D1Client.D1ClientConfig["db"]) => D1Client.layer({ db });
