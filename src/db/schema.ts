// Note: This template includes both Prisma and Drizzle. If you choose to use Drizzle:
// 1. Delete the /prisma directory
// 2. Delete /src/lib/prisma.ts
// 3. Remove prisma-related dependencies from package.json
// 4. Run: npm uninstall prisma @prisma/client

import { text, timestamp, pgTable, serial, primaryKey } from "drizzle-orm/pg-core";

export const tableName = pgTable("tableName", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  creatorId: text("creator_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});