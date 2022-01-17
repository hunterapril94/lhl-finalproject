DROP TABLE IF EXISTS products_transactions CASCADE;
CREATE TABLE products_transactions (
  id SERIAL PRIMARY KEY NOT NULL, 
  transaction_id INTEGER NOT NULL REFERENCES transactions(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status VARCHAR(255) NOT NULL
)