import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env.local")
}

export const sql = neon(process.env.DATABASE_URL)

// Initialize the table if not exists
export async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        user_id TEXT UNIQUE NOT NULL,
        email TEXT NOT NULL,
        plan TEXT NOT NULL,
        status TEXT NOT NULL,
        lemon_subscription_id TEXT UNIQUE NOT NULL,
        lemon_customer_id TEXT NOT NULL,
        current_period_end TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      )
    `
    console.log("✅ Subscriptions table is ready.")
  } catch (err) {
    console.error("❌ Failed to create subscriptions table:", err)
  }
}
