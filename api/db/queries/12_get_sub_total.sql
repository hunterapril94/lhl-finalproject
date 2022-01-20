SELECT SUM(price_per_day_cents) AS subtotal , SUM(deposit_amount_cents) AS total_deposit
FROM products 
GROUP BY products.id
HAVING id = 1
OR id = 2
OR id = 3
OR id = 4
;
