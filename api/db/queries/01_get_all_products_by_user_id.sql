SELECT * FROM products 
JOIN users ON products.user_id = users.id
WHERE users.id = 3;