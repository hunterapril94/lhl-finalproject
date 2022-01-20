SELECT products_transactions.id FROM products_transactions
JOIN transactions ON transaction_id = transactions.id
WHERE user_id = 1 AND  products_transactions.id =4;

