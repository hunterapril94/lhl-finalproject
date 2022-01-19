SELECT products.name, products.price_per_day_cents, products_transactions.start_time, products_transactions.end_time, users.email AS requester_email, 
users.phone AS requester_phone

FROM transactions 
JOIN users on transactions.user_id = users.id
JOIN products_transactions ON transactions.id = products_transactions.transaction_id

JOIN products ON products_transactions.product_id = products.id

WHERE products.user_id = 4
AND products_transactions.status = 'pending'

GROUP BY products.name, products.price_per_day_cents, products_transactions.start_time, products_transactions.end_time, requester_email, requester_phone;