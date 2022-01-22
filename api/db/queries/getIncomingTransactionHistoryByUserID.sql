SELECT products_transactions.id AS products_transactions_id ,products.name, products.price_per_day_cents, products_transactions.start_time, products_transactions.end_time, users.email AS requester_email,
        users.phone AS requester_phone, status, deposit_amount_cents

        FROM transactions
        JOIN users on transactions.user_id = users.id
        JOIN products_transactions ON transactions.id = products_transactions.transaction_id

        JOIN products ON products_transactions.product_id = products.id
      
      WHERE (products_transactions.status = 'rejected' OR products_transactions.status = 'returned' OR products_transactions.status = 'canceled')
      AND products.user_id = 1