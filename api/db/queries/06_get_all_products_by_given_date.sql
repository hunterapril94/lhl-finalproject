SELECT *
FROM products 
JOIN products_transactions
WHERE products_transactions.start_time < 'February 1, 2022' 
AND products_transactions.end_time <  'February 2, 2022'
-- this query is not finished