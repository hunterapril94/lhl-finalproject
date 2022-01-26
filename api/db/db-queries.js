const { query } = require("express");

module.exports = (db) => {
  // USER QUERIES
  const getUserByEmail = function (email) {
    return db
      .query(`SELECT * FROM users WHERE email = $1;`, [email])
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const getUserById = function (id) {
    return db
      .query(
        `
    SELECT * FROM users WHERE id = $1;`,
        [id]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const addUser = function (user) {
    const values = [
      user.first_name,
      user.last_name,
      user.address,
      user.neighborhood,
      user.borrower,
      user.lender,
      user.email,
      user.cash_balance_cents,
      user.phone,
      user.password,
    ];

    return db
      .query(
        `INSERT INTO users (first_name, last_name, address, neighborhood, 
          borrower, lender, email, cash_balance_cents, phone, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;`,
        values
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const updateUserInfo = function (id, object) {
    const queryParams = [
      id,
      object.first_name,
      object.last_name,
      object.address,
      object.neighborhood,
      object.email,
      object.phone,
      object.lender,
      object.borrower,
    ];

    return db
      .query(
        `
        UPDATE users
        SET first_name = $2 ,
            last_name = $3 ,
            address = $4,
            neighborhood = $5,
            email = $6,
            phone = $7,
            lender= $8,
            borrower=$9
        
        WHERE id = $1
  RETURNING *;`,
        queryParams
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  //-----------------------------------------------------------------
  // Products Queries
  //-----------------------------------------------------------------

  const getAllProducts = function () {
    return db
      .query(
        ` 
    SELECT products.*, AVG(reviews.stars) AS avg_stars 
    FROM products
    FULL OUTER JOIN reviews on products.id = product_id
    GROUP BY products.id;`
      )
      .then((result) => {
        return result.rows;
      });
  };

  const getAllProductsNotOwned = function (userId) {
    return db
      .query(
        ` 
    SELECT products.*, AVG(reviews.stars) AS avg_stars 
    FROM products
    FULL OUTER JOIN reviews on products.id = product_id
    WHERE NOT products.user_id = $1
    GROUP BY products.id;`,
        [userId]
      )
      .then((result) => {
        return result.rows;
      });
  };

  const getReviewsByProductId = function (id) {
    //console.log(id);
    return db
      .query(
        `SELECT * , users.first_name, users.last_name, users.neighborhood
        FROM reviews
        JOIN users ON reviews.user_id = users.id
      WHERE product_id = $1
      ORDER BY reviews.id;
    `,
        [Number(id)]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const getProductById = function (id) {
    return db
      .query(
        ` SELECT products.*, AVG(reviews.stars) AS avg_stars 
        FROM products
        LEFT JOIN reviews on products.id = product_id
        WHERE products.id = $1
        GROUP BY products.id
        `,
        [id]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const getProductsByCategory = function (category) {
    return db
      .query(
        `
        SELECT products.*, AVG(reviews.stars) AS avg_stars 
        FROM products
        LEFT JOIN reviews on products.id = product_id  
        WHERE products.category = $1
        GROUP BY products.id;`,
        [category]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const getProductsByUserId = function (userId) {
    return db
      .query(
        `  
        SELECT products.*, AVG(reviews.stars) AS avg_stars 
        FROM products
        FULL OUTER JOIN reviews on products.id = product_id
        WHERE  products.user_id = $1
        GROUP BY products.id;`,
        [userId]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const getUnreadMessagesCountForProductTxByUserID = function (userID) {
    return db
      .query(
        `  
        SELECT   products_transactions.id AS   products_tx_id, COUNT(messages.id) AS unread_total from messages 
        JOIN products_transactions ON product_transaction_id =  products_transactions.id 
        JOIN products ON product_id = products.id
        JOIN users ON users.id = messages.user_id
        JOIN transactions ON transactions.id  = products_transactions.transaction_id 
        WHERE (products.user_id = $1 OR  transactions.user_id = $1)
        AND  NOT messages.user_id  = $1 AND messages.is_read = false
	      GROUP BY products_transactions.id;`,
        [userID]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const getIncommingMessagesByProductTransactionID = function (txID, userID) {
    return db
      .query(
        `  
        SELECT users.*, messages.* from messages 
        JOIN products_transactions ON product_transaction_id =  products_transactions.id 
        JOIN products ON product_id = products.id
        JOIN users ON users.id = messages.user_id
        JOIN transactions ON transactions.id  = products_transactions.transaction_id 
        WHERE product_transaction_id = $1 AND (products.user_id = $2 OR messages.user_id = $2 OR transactions.user_id = $2)
        ;`,
        [txID, userID]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const getMessageByUserIDandMessageID = function (msgID, userID) {
    return db
      .query(
        `  
        SELECT * FROM messages
        WHERE user_id = $2 AND  id= $1
        ;`,
        [msgID, userID]
      )
      .then((result) => {
        if (result) {
          // console.log(result);
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const updateMessageToReadByMessageID = function (msgID, userID) {
    return db
      .query(
        `  
        UPDATE messages
        SET is_read = true
        WHERE id = $1 AND NOT user_id = $2
      	RETURNING *;`,
        [msgID, userID]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const addMessage = function (message) {
    const values = [
      message.product_transaction_id,
      message.user_id,
      message.text,
    ];

    return db
      .query(
        `INSERT INTO messages (product_transaction_id , user_id, text)
        VALUES
        ( $1,$2 ,$3)
        RETURNING *;`,
        values
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const getBorrowedProductsByUserId = function (userId) {
    return db
      .query(
        `SELECT products_transactions.start_time AS start_time, products_transactions.end_time AS end_time, products.name,
        users.first_name AS owner_first_name,
        users.last_name AS owner_last_name,products.price_per_day_cents, 
        users.email AS owner_email, users.phone AS owner_phone, products_transactions.id AS products_transactions_id
        FROM transactions 
        JOIN products_transactions ON transactions.id = products_transactions.transaction_id
        JOIN products ON products_transactions.product_id = products.id
        JOIN users ON products.user_id = users.id
        WHERE transactions.user_id = $1 AND products_transactions.status = 'activate' 
        GROUP BY products.name, start_time, end_time, users.first_name, users.last_name, transactions.user_id, products.price_per_day_cents, owner_email, owner_phone, products_transactions_id;`,
        [userId]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  // getBorrowedProductsByUserId(1).then((res) => {
  //   // console.log("getBorrowedProductsByUserId", res);
  // });

  const getLentProducstByUserId = function (userId) {
    return db
      .query(
        `SELECT products_transactions.start_time AS start_time, products_transactions.end_time AS end_time, products.name,
        users.first_name AS borrower_first_name, users.last_name AS borrower_last_name, users.email AS borrower_email, users.phone AS borrower_phone, products.image, products_transactions.id AS products_transactions_id 
        
        FROM transactions 
        JOIN users ON transactions.user_id = users.id
        JOIN products_transactions ON transactions.id = products_transactions.transaction_id
        JOIN products ON products_transactions.product_id = products.id
        
        WHERE products.user_id = $1 AND products_transactions.status = 'activate'`,
        [userId]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const getProductsBySearchTerm = function (searchTerm) {
    const queryParam = `%${searchTerm}%`;
    return db
      .query(
        `SELECT products.* , AVG(reviews.stars) AS stars
    FROM products
    JOIN reviews ON reviews.product_id = products.id
    WHERE LOWER(products.name) LIKE LOWER($1)
    OR LOWER(products.category) LIKE LOWER($1)
    GROUP BY products.id;`,
        [queryParam]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const createProduct = function (userId, object) {
    const queryParams = [
      userId,
      object.category,
      object.name,
      object.price_per_day_cents,
      object.description,
      object.deposit_amount_cents,
      object.image,
    ];
    return db
      .query(
        `
        INSERT INTO products (user_id, category, name, price_per_day_cents, description, deposit_amount_cents, image)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        ;`,
        queryParams
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const updateProductInfo = function (userId, object) {
    const queryParams = [
      userId,
      object.category,
      object.name,
      object.price_per_day_cents,
      object.description,
      object.deposit_amount_cents,
      object.image,
      object.id,
    ];
    return db
      .query(
        `
  UPDATE products
    SET category = $2 ,
    name = $3 ,
    price_per_day_cents = $4,
    description = $5,
    deposit_amount_cents = $6,
    image = $7
  WHERE id = $8
  AND user_id = $1
  RETURNING *;`,
        queryParams
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  //  REQUEST QUERIES HERE

  // getBorrowRequestsByUserId --- requesting to borrow something

  const getPendingLendRequestsByUserId = function (userId) {
    return db

      .query(
        `SELECT products_transactions.id AS products_transactions_id ,products.name, products.price_per_day_cents, products_transactions.start_time, products_transactions.end_time, users.email AS requester_email,
        users.phone AS requester_phone, status, deposit_amount_cents

        FROM transactions
        JOIN users on transactions.user_id = users.id
        JOIN products_transactions ON transactions.id = products_transactions.transaction_id

        JOIN products ON products_transactions.product_id = products.id

        WHERE products.user_id = $1
        AND products_transactions.status = 'pending'`,
        [userId]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  // getPendingLendRequestsByUserId -- incomming request from someone

  const getBorrowRequestsByUserId = function (userId) {
    return db

      .query(
        `SELECT products_transactions.id AS products_transactions_id,products.name, products.price_per_day_cents, products_transactions.start_time, products_transactions.end_time, users.email AS owner_email, users.phone AS owner_phone, status, deposit_amount_cents

        FROM products_transactions
        JOIN transactions ON transaction_id = transactions.id
        JOIN products ON products_transactions.product_id = products.id
        JOIN users ON products.user_id = users.id
        
        WHERE transactions.user_id = $1
        AND products_transactions.status = 'pending';`,
        [userId]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const getIncomingTransactionHistoryByUserID = function (userId) {
    return db
      .query(
        `SELECT products_transactions.id AS products_transactions_id,products.name, products.price_per_day_cents, products_transactions.start_time, products_transactions.end_time, products.user_id AS owner_is,  status,deposit_amount_cents, transactions.user_id
      
      FROM products_transactions
      JOIN transactions ON transaction_id = transactions.id
      JOIN products ON products_transactions.product_id = products.id
      JOIN users ON products.user_id = users.id
      
      WHERE (products_transactions.status = 'rejected' OR products_transactions.status = 'returned' OR products_transactions.status = 'canceled' OR products.user_id = $1 OR transactions.user_id = $1)
       ;`,
        [userId]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  const getTransactionHistoryByUserID = function (userId) {
    return db
      .query(
        `SELECT products_transactions.id AS products_transactions_id,products.name, products.price_per_day_cents, products_transactions.start_time, products_transactions.end_time, products.id AS product_id, products.user_id AS owner_id,transactions.user_id AS requester_id,  status,deposit_amount_cents
      
        FROM products_transactions
        JOIN transactions ON transaction_id = transactions.id
        JOIN products ON products_transactions.product_id = products.id
        JOIN users ON products.user_id = users.id
        
        WHERE (products_transactions.status = 'rejected' OR products_transactions.status = 'returned' OR products_transactions.status = 'canceled' OR products.user_id = $1 OR transactions.user_id = $1)

        AND (products_transactions.status != 'pending') AND (products_transactions.status != 'activate')
       ;`,
        [userId]
      )
      .then((result) => {
        if (result) {
          return result.rows;
        } else {
          return null;
        }
      });
  };

  getTransactionHistoryByUserID(3).then((res) => console.log(res));

  // REVIEW QUERIES
  const getStarsByProductId = function (id) {
    return db
      .query(`SELECT AVG(stars) FROM reviews WHERE product_id= $1;`, [id])
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  // TRANSACTION QUERIES

  const createTransaction = function (object) {
    const queryParams = [object.user_id, object.subtotal, object.deposit_total];
    return db
      .query(
        `INSERT INTO transactions
    (user_id, subtotal, deposit_total)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
        queryParams
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  // Hellper function to see if the transaction exists
  const getTransactionByid = function (id) {
    return db
      .query(
        `SELECT * 
        FROM transactions
        WHERE id = $1;
  `,
        [id]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  // still breaks if the transactin_id does not exist
  const createPendingProductTransaction = function (productTransaction) {
    let n = 1;
    let queryString = `INSERT INTO products_transactions
              (transaction_id, product_id, start_time, end_time, status)
                VALUES `;
    const queryParams = [];
    productTransaction.forEach((element) => {
      queryParams.push(
        element.transaction_id,
        element.product_id,
        element.start_time,
        element.end_time
      );
      queryString += ` ($${n++}, $${n++}, $${n++}, $${n++}, 'pending'),`;
    });
    queryString = queryString.slice(0, -1);
    if (getTransactionByid(queryParams[0])) {
      return db
        .query(`${queryString}RETURNING *;`, queryParams)
        .then((result) => {
          if (result) {
            return result.rows[0];
          } else {
            return null;
          }
        });
    } else {
      return null;
    }
  };

  const updateProductTransactionStatus = function (id, status) {
    return db
      .query(
        `UPDATE products_transactions
         SET status = $2 
         WHERE id = $1
         RETURNING *;
         `,
        [id, status]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  // to subtract just add a third param

  const updateBalanceByEmail = function (email, amount, subtract) {
    return db
      .query(
        `UPDATE users
         SET  cash_balance_cents = cash_balance_cents ${
           subtract ? "-" : "+"
         } $2 
         WHERE email = $1
         RETURNING *;
         `,
        [email, Number(amount)]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };
  const updateBalance = function (id, amount, subtract) {
    return db
      .query(
        `UPDATE users
         SET  cash_balance_cents = cash_balance_cents ${
           subtract ? "-" : "+"
         } $2 
         WHERE id = $1
         RETURNING *;
         `,
        [Number(id), Number(amount)]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const getBalanceByUserID = function (id) {
    return db
      .query(
        `SELECT cash_balance_cents  FROM users
    WHERE id = $1;`,
        [Number(id)]
      )
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };
  const addNewReview = function (productId, userId, stars, title, text) {
    return db
      .query(
        `
      INSERT INTO reviews (product_id, user_id, stars, title, text)
      VALUES 
      ($1, $2, $3, $4, $5);
      `,
        [Number(productId), Number(userId), Number(stars), title, text]
      )
      .then((res) => {
        //console.log("db query worked");
      });
  };

  return {
    getUserByEmail,
    updateUserInfo,
    addUser,
    getUserById,
    updateBalanceByEmail,
    getUnreadMessagesCountForProductTxByUserID,
    getMessageByUserIDandMessageID,
    updateMessageToReadByMessageID,
    // products
    createProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getProductsByUserId,
    getBorrowedProductsByUserId,
    getLentProducstByUserId,
    getLentProducstByUserId,
    getProductsBySearchTerm,
    updateProductInfo,
    getStarsByProductId,
    getReviewsByProductId,
    addMessage,
    // requests
    getPendingLendRequestsByUserId,
    getIncommingMessagesByProductTransactionID,
    getBorrowRequestsByUserId,
    getAllProductsNotOwned,
    // transactions
    createTransaction,
    createPendingProductTransaction,
    updateProductTransactionStatus,
    updateBalance,
    getBalanceByUserID,
    getTransactionHistoryByUserID,
    addNewReview,
    // addToBalance,
    // subtractFromBalance,
  };
};
