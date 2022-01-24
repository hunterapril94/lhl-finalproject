DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  product_transaction_id INTEGER NOT NULL REFERENCES products_transactions(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  text TEXT
);