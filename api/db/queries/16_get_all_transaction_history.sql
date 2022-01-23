SELECT products_transactions.id AS products_transactions_id,products.name, products.price_per_day_cents, products_transactions.start_time, products_transactions.end_time, products.user_id AS owner_is,  status,deposit_amount_cents, transactions.user_id
      
      FROM products_transactions
      JOIN transactions ON transaction_id = transactions.id
      JOIN products ON products_transactions.product_id = products.id
      JOIN users ON products.user_id = users.id
      
      WHERE (products_transactions.status = 'rejected' OR products_transactions.status = 'returned' OR products_transactions.status = 'canceled' OR products.user_id = 1 OR transactions.user_id = 1);