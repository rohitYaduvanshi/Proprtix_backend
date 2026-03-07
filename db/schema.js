const { pgTable, serial, text, timestamp } = require("drizzle-orm/pg-core");

// Schema definition using CommonJS
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull(), // 'USER', 'GOVT_OFFICER', etc.
  walletAddress: text('wallet_address').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

module.exports = { users };