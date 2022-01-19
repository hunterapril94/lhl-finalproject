SELECT products_transactions.start_time AS start_time, products_transactions.end_time AS end_time, products.name,
users.first_name AS borrower_first_name, users.last_name AS borrower_last_name, users.email AS borrower_email, users.phone AS borrower_phone, products.image

FROM transactions 
JOIN users ON transactions.user_id = users.id
JOIN products_transactions ON transactions.id = products_transactions.transaction_id
JOIN products ON products_transactions.product_id = products.id

WHERE products.user_id = 3
