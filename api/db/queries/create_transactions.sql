INSERT INTO transactions
    (user_id, subtotal, deposit_total)
    VALUES (1, 2, 3)
    RETURNING *;