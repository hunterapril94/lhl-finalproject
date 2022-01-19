SELECT products.*, AVG(reviews.stars) AS avg_stars 
FROM products
JOIN users ON products.user_id = users.id
JOIN reviews ON products.id = reviews.product_id
WHERE users.id = 3
GROUP BY products.id;