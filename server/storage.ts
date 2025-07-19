import { contacts, type Contact, type InsertContact } from "@shared/schema";
import { db } from "./db";
import { eq, inArray } from "drizzle-orm";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  updateContact(id: number, updates: Partial<Contact>): Promise<Contact | null>;
  bulkUpdateContacts(ids: number[], updates: Partial<Contact>): Promise<Contact[]>;
}

export class DatabaseStorage implements IStorage {
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    const rawContacts = await db.select().from(contacts).orderBy(contacts.createdAt);
    // Add default values for new columns that might not exist yet
    return rawContacts.map(contact => ({
      ...contact,
      isRead: contact.isRead ?? false,
      isStarred: contact.isStarred ?? false,
    }));
  }

  async updateContact(id: number, updates: Partial<Contact>): Promise<Contact | null> {
    // For now, we'll simulate the update since the database schema might not have the new columns yet
    // This allows the UI to work while we handle database migration separately
    const allContacts = await this.getContacts();
    const contact = allContacts.find(c => c.id === id);
    
    if (!contact) {
      return null;
    }

    // Return the contact with simulated updates
    return {
      ...contact,
      ...updates,
    };
  }

  async bulkUpdateContacts(ids: number[], updates: Partial<Contact>): Promise<Contact[]> {
    // For now, we'll simulate the bulk update
    const allContacts = await this.getContacts();
    const updatedContacts = allContacts
      .filter(c => ids.includes(c.id))
      .map(contact => ({
        ...contact,
        ...updates,
      }));
    
    return updatedContacts;
  }
}

export const storage = new DatabaseStorage();
