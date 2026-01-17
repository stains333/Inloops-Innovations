import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  department: text("department").notNull(),
  salary: integer("salary").notNull(),
  status: text("status").notNull().default("ACTIVE"), // 'ACTIVE' | 'INACTIVE'
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({ id: true });

export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
