import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // List all active employees
  app.get(api.employees.list.path, async (req, res) => {
    const employees = await storage.getEmployees();
    res.json(employees);
  });

  // Get single employee
  app.get(api.employees.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const employee = await storage.getEmployee(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  });

  // Create employee
  app.post(api.employees.create.path, async (req, res) => {
    try {
      const input = api.employees.create.input.parse(req.body);
      
      // Check for duplicate email
      const existing = await storage.getEmployeeByEmail(input.email);
      if (existing) {
        return res.status(409).json({ message: "Email already exists" });
      }

      const employee = await storage.createEmployee(input);
      res.status(201).json(employee);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Update employee
  app.put(api.employees.update.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      const input = api.employees.update.input.parse(req.body);

      // If email is being updated, check uniqueness
      if (input.email) {
        const existing = await storage.getEmployeeByEmail(input.email);
        if (existing && existing.id !== id) {
          return res.status(409).json({ message: "Email already exists" });
        }
      }

      const updated = await storage.updateEmployee(id, input);
      if (!updated) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Delete employee (Soft delete)
  app.delete(api.employees.delete.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const success = await storage.deleteEmployee(id);
    if (!success) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(204).send();
  });

  // Seed data if empty
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getEmployees();
  if (existing.length === 0) {
    await storage.createEmployee({
      name: "John Doe",
      email: "john@example.com",
      department: "Engineering",
      salary: 85000,
      status: "ACTIVE"
    });
    await storage.createEmployee({
      name: "Jane Smith",
      email: "jane@example.com",
      department: "HR",
      salary: 65000,
      status: "ACTIVE"
    });
    await storage.createEmployee({
      name: "Bob Johnson",
      email: "bob@example.com",
      department: "Marketing",
      salary: 72000,
      status: "ACTIVE"
    });
    console.log("Database seeded with initial employees");
  }
}
