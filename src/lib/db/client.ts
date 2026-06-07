import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// This should only be used in server contexts (API routes)
// In React Native, DATABASE_URL will not be available
const db_url = process.env.DATABASE_URL;

if (!db_url) {
  // Create a safe fallback to prevent crashes in React Native context
  console.warn(
    "WARNING: DATABASE_URL not set. Database operations will fail. " +
      "This is expected in React Native. Ensure DATABASE_URL is set in server context."
  );
  // Export a placeholder that will error if actually used
  export const db = {
    select: () => {
      throw new Error(
        "Database not configured. DATABASE_URL environment variable is not set. " +
          "This should only be called from API routes."
      );
    },
  } as any;
} else {
  const sql = neon(db_url);
  export const db = drizzle({ client: sql });
}
