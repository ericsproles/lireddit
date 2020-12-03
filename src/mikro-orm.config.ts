import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
// import dotenv from "dotenv";
// dotenv.config();
require("dotenv").config();

console.log(__dirname);

export interface ConnectionOptions {
  dbName?: string;
  clientUrl?: string;
  host?: string;
  port?: number;
  user?: string;
  password?: string;
}

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post],
  dbName: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_CONNECTION_URL,
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
