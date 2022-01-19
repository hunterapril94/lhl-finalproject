SELECT products.* , AVG(reviews.stars) AS stars
   FROM products
   JOIN reviews ON reviews.product_id = products.id
   WHERE LOWER(products.name) LIKE LOWER('%ill%')
   OR LOWER(products.category) LIKE LOWER('%ill%')
   GROUP BY products.id;


