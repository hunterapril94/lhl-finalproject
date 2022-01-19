UPDATE products
SET category = 'kitchen stuff' ,
    name = 'Cuisinart Mixer' ,
    price_per_day_cents = '60',
    description = 'very good mixes',
    deposit_amount_cents = '8888',
    image = 'https://homedepot.scene7.com/is/image/homedepotcanada/p_1000851792.jpg?wid=1000&hei=1000&op_sharpen=1&product-images=l'

WHERE id = 1 
AND user_id = 1
RETURNING *;