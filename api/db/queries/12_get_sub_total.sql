SELECT SUM( price_per_day_cents) AS subtotal , SUM(deposit_amount_cents) AS total_deposit
FROM products 
WHERE id = 1
OR id = 2
OR id = 3
OR id = 4 

GROUP BY id;