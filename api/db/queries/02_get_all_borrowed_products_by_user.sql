SELECT products_transactions.start_time AS start_time, products_transactions.end_time AS end_time, products.name,
users.first_name AS owner_first_name,
users.last_name AS owner_last_name,products.price_per_day_cents, 
users.email AS owner_email, users.phone AS owner_phone
FROM transactions 
JOIN products_transactions ON transactions.id = products_transactions.transaction_id
JOIN products ON products_transactions.product_id = products.id
JOIN users ON products.user_id = users.id
WHERE transactions.user_id = 3
GROUP BY products.name, start_time, end_time, users.first_name, users.last_name, transactions.user_id, products.price_per_day_cents, owner_email, owner_phone;