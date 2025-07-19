import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import path from "path";
import fs from "fs";

const updateContactSchema = z.object({
  isRead: z.boolean().optional(),
  isStarred: z.boolean().optional(),
});

const bulkUpdateSchema = z.object({
  ids: z.array(z.number()),
  updates: updateContactSchema,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Update individual contact
  app.patch("/api/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid contact ID" });
      }
      
      const validatedData = updateContactSchema.parse(req.body);
      const contact = await storage.updateContact(id, validatedData);
      
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      
      res.json(contact);
    } catch (error) {
      console.error("Error updating contact:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid update data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update contact" });
      }
    }
  });

  // Bulk update contacts
  app.patch("/api/contacts/bulk", async (req, res) => {
    try {
      const validatedData = bulkUpdateSchema.parse(req.body);
      const results = await storage.bulkUpdateContacts(validatedData.ids, validatedData.updates);
      res.json({ updated: results.length, contacts: results });
    } catch (error) {
      console.error("Error bulk updating contacts:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid bulk update data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to bulk update contacts" });
      }
    }
  });

  // Resume download endpoint
  app.get("/api/resume", (req, res) => {
    const resumePath = path.join(process.cwd(), "public", "resume.pdf");
    
    // Check if resume file exists
    if (fs.existsSync(resumePath)) {
      res.download(resumePath, "Shadman_Sakib_Resume.pdf");
    } else {
      // If no physical file, return a JSON response with resume data
      res.json({
        message: "Resume download not available",
        contact: "Please contact shadman106@gmail.com for resume"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
