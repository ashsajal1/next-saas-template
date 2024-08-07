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