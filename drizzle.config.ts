import { defineConfig } from "drizzle-kit";
import { env } from "./env";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  strict: true,
  dbCredentials: { url: env.DATABASE_URL },
});
