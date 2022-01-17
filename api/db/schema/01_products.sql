DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  category VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price_per_day_cents INTEGER NOT NULL,
  description TEXT,
  deposit_amount_cents INTEGER NOT NULL,
  image TEXT NOT NULL
);