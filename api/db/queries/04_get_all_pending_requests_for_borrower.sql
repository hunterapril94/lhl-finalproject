SELECT products.name, products.price_per_day_cents, products_transactions.start_time, products_transactions.end_time, users.email AS owner_email, users.phone AS owner_phone

FROM products_transactions
JOIN transactions ON transaction_id = transactions.id
JOIN products ON products_transactions.product_id = products.id
JOIN users ON products.user_id = users.id

WHERE transactions.user_id = 3
AND products_transactions.status = 'pending'

GROUP BY products.name, products.price_per_day_cents, products_transactions.start_time, products_transactions.end_time, owner_email, owner_phone;