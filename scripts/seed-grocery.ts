import { randomUUID } from "crypto";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { groceryItems } from "../src/lib/db/schema.js";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required in .env");
}

const db = drizzle(databaseUrl);

const seedItems = [
  {
    name: "Bananas",
    category: "Produce",
    quantity: 6,
    priority: "medium",
    purchased: false,
  },
  {
    name: "Avocado",
    category: "Produce",
    quantity: 3,
    priority: "high",
    purchased: false,
  },
  {
    name: "Greek Yogurt",
    category: "Dairy",
    quantity: 2,
    priority: "medium",
    purchased: true,
  },
  {
    name: "Cheddar Cheese",
    category: "Dairy",
    quantity: 1,
    priority: "low",
    purchased: false,
  },
  {
    name: "Sourdough Bread",
    category: "Bakery",
    quantity: 1,
    priority: "high",
    purchased: false,
  },
  {
    name: "Pasta",
    category: "Pantry",
    quantity: 2,
    priority: "low",
    purchased: false,
  },
  {
    name: "Tomato Sauce",
    category: "Pantry",
    quantity: 2,
    priority: "medium",
    purchased: true,
  },
  {
    name: "Granola Bars",
    category: "Snacks",
    quantity: 5,
    priority: "medium",
    purchased: false,
  },
  {
    name: "Dark Chocolate",
    category: "Snacks",
    quantity: 2,
    priority: "low",
    purchased: false,
  },
  {
    name: "Eggs",
    category: "Dairy",
    quantity: 12,
    priority: "high",
    purchased: false,
  },
];

async function seed() {
  const items = seedItems.map((item) => ({
    id: randomUUID(),
    ...item,
    updated_at: Date.now(),
  }));

  console.log(`Seeding ${items.length} grocery items...`);
  await db.delete(groceryItems);
  await db.insert(groceryItems).values(items);
  console.log("Seed complete.");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
