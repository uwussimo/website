import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "./contract.d";
import contractJson from "./contract.json" with { type: "json" };

const createClient = () =>
  postgres<Contract>({
    contractJson,
    url: process.env["DATABASE_URL"]!,
  });

// one client per process: next's dev server reloads modules, and every
// reload would otherwise open another connection pool
const globalForDb = globalThis as unknown as {
  db?: ReturnType<typeof createClient>;
};

export const db = globalForDb.db ?? createClient();

if (process.env.NODE_ENV !== "production") globalForDb.db = db;
